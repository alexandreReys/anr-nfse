const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const s3Options = {signatureVersion: 'v4'};

const s3 = new AWS.S3(s3Options);

module.exports.generatePreSignedUrl = async (event) => {
  //https://medium.com/@aidan.hallett/securing-aws-s3-uploads-using-presigned-urls-aa821c13ae8d
  //https://stackoverflow.com/questions/58234437/corrupted-image-on-uploading-image-to-aws-s3-via-signed-url

  try {
    const body = JSON.parse(event.body);
    
    const token = getTokenData(event.headers.Authorization);
    if (token.error) return errorhandler(token.error);
    const userId = token.data.id;

    const fileInfo = getFileType(body.filename);
    
    let imageEnabled = true;
    if (fileInfo.fileTypeFolder === 'others') {
      imageEnabled = body.imageEnabled === undefined || body.imageEnabled === null
        ? false
        : body.imageEnabled;
    };

    const assetFilename = `assets/${fileInfo.fileTypeFolder}/${uuidv4()}-${body.filename}`;

    let urlKey = `users/${userId}/${assetFilename}`
    if (body.worldId !== undefined) {
      urlKey = `users/${userId}/events/${body.eventId}/worlds/${body.worldId}/${assetFilename}`
    } else {
      if (body.eventId !== undefined) {
        urlKey = `users/${userId}/events/${body.eventId}/${assetFilename}`
      };
    };

    const fileNameKey  = urlKey.replace(`.${fileInfo.fileExtension}`, '');
    
    let thumbnailKey = fileInfo.fileTypeFolder !== 'images' 
      ? `${fileNameKey}-thumbnail.png` 
      : `${fileNameKey}-thumbnail.${fileInfo.fileExtension}`;

    thumbnailKey = changeFileTypeFolder(thumbnailKey, fileInfo.fileTypeFolder);
    
    let otherImgKey = `${fileNameKey}-img.png`
    otherImgKey = changeFileTypeFolder(otherImgKey, fileInfo.fileTypeFolder);

    const url = getPresignedUrl(urlKey);
    const response = getResponse(body, fileInfo, url, imageEnabled, otherImgKey, thumbnailKey);

    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(response),
    };
  } catch (err) {
    return errorHandler(err.message);
  }

  /////////////////////////////////////////////////////////////////////////////
  // getResponse
  /////////////////////////////////////////////////////////////////////////////
  function getResponse(body, fileInfo, url, imageEnabled, otherImgKey, thumbnailKey) {
    let response;
    if (fileInfo.fileTypeFolder === 'others') {
      const img       = imageEnabled ? getPresignedUrl( otherImgKey ) : null;
      const thumbnail = imageEnabled ? getPresignedUrl( thumbnailKey ) : null;
      response = { 
        info: {
          name: body.filename, 
          asset: url.split('?')[0], 
          ...(imageEnabled && { image: img.split('?')[0] }),
          ...(imageEnabled && { thumbnail: thumbnail.split('?')[0] }),
        },
        preSigned: {
          asset: url, 
          ...(imageEnabled && { image: img }),
          ...(imageEnabled && { thumbnail: thumbnail }),
        }
      }
    } else {
      const thumbnail = getPresignedUrl( thumbnailKey );
      response = { 
        info: {
          name: body.filename, 
          image: url.split('?')[0], 
          thumbnail: thumbnail.split('?')[0],
        },
        preSigned: {
          image: url, 
          thumbnail: thumbnail,
        }
      }
    }

    return response;
  }

  /////////////////////////////////////////////////////////////////////////////
  // changeFileTypeFolder
  /////////////////////////////////////////////////////////////////////////////
  function changeFileTypeFolder(key, mainFileType) {
    const fileInfo = getFileType(key);
    return key.replace(`/${mainFileType}/`, `/${fileInfo.fileTypeFolder}/`);
  }

  /////////////////////////////////////////////////////////////////////////////
  // getPresignedUrl
  /////////////////////////////////////////////////////////////////////////////
  function getPresignedUrl(key) {
    const fileExtension = key.split('.')[key.split('.').length - 1].toLowerCase();
    const bucket = process.env.BUCKET_NAME;
    const expireSeconds = 60 * (24 * 60);

    let fileType;
    switch (fileExtension) {
      case 'mp4':
        fileType = 'video/mp4';
        break;
      case 'jpg':
      case 'jpeg':
        fileType = 'image/jpeg';
        break;
      case 'pjpeg':
        fileType = 'image/pjpeg';
        break;
      case 'png':
        fileType = 'image/png';
        break;
      case 'git':
        fileType = 'image/gif';
        break;
      case 'pdf':
        fileType = 'application/pdf';
        break;
      case 'txt':
        fileType = 'text/plain';
        break;
      case 'zip':
        fileType = 'application/zip';
        break;
      default:
        fileType = 'image/jpeg';
    }

    const options = {
      Bucket: bucket,
      Key: key,
      Expires: expireSeconds,
      ContentType: fileType,
      ACL: 'public-read',
    };

    let result = s3.getSignedUrl('putObject', options);
    result = result.replace('https://s3.amazonaws.com/','https://');

    return result;
  }

  /////////////////////////////////////////////////////////////////////////////
  // getTokenData
  /////////////////////////////////////////////////////////////////////////////
  function getTokenData(token) {
    // try {

    if (token === undefined || !token) {
        const errorMessage = {error: 'Token is Required'};
        console.log(errorMessage);
        return errorMessage;
      }
  
      token = token.replace('Bearer ', '');
      let tokenData;
      try {
        tokenData = jwt.verify(
          token, 
          process.env.JWT_SECRET
        );
      } catch (error) {
        const errorMessage = {error: 'Token invalido'};
        console.log(errorMessage);
        return errorMessage;
      }
  
      return { data: tokenData }
  };

  /////////////////////////////////////////////////////////////////////////////
  // errorHandler
  /////////////////////////////////////////////////////////////////////////////
  function errorHandler(errorMessage) {
    console.log('error: ', errorMessage);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }

  /////////////////////////////////////////////////////////////////////////////
  // getFileType
  /////////////////////////////////////////////////////////////////////////////
  function getFileType(urlKey) {
    const fileExtension = urlKey.split('.')[urlKey.split('.').length - 1].toLowerCase();
    let fileTypeFolder = 'others';

    if (['jpg','jpeg','pjpeg','png','git'].indexOf(fileExtension) > -1) {
      fileTypeFolder = 'images';
    };

    if (['mp4'].indexOf(fileExtension) > -1) {
      fileTypeFolder = 'videos';
    };

    return {fileTypeFolder, fileExtension};
  };
};
