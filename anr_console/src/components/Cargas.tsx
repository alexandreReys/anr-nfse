const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
const buttonStyles = 'flex w-full justify-center text-white bg-blue-600 p-3 rounded font-bold mt-6';
const labelStyles = 'w-30 inline-block mt-2';

export default function Cargas() {

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto pt-4 pb-1 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Cargas</h1>
        </div>
      </header>

      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleFormSubmit} className="max-w-full">
            
            <label htmlFor="numero" className={labelStyles}>Numero:</label>
            <input id="numero" name="numero" className={inputCodeStyles} type="text" />

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="veiculo" className={labelStyles}>Veiculo:</label>
                <select id="veiculo" name="veiculo" className={inputStyles}>
                  <option value=""></option>
                  <option value="Volvo / FH / EDR6354">Volvo / FH / EDR6354</option>
                  <option value="Mercedes-Benz / Actros / RER1936">Mercedes-Benz / Actros / RER1936</option>
                  <option value="Scania / R450 / AWS6373">Scania / R450 / AWS6373</option>
                  <option value="Man / TGX / mns5252">Man / TGX / mns5252</option>
                  <option value="Iveco / Stralis / SLL3542">Iveco / Stralis / SLL3542</option>
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="motorista" className={labelStyles}>Motorista:</label>
                <select id="motorista" name="motorista" className={inputStyles}>
                  <option value=""></option>
                  <option value="Roberto Silva">Roberto Silva</option>
                  <option value="Marcelo Souza">Marcelo Souza</option>
                  <option value="Antonio Marques">Antonio Marques</option>
                  <option value="Adriano monteiro">Adriano monteiro</option>
                  <option value="Acacio de Farias">Acacio de Farias</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="dataCad" className={labelStyles}>Data Cad:</label>
                <input id="dataCad" name="dataCad" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="dataSaida" className={labelStyles}>Data Saida:</label>
                <input id="dataSaida" name="dataSaida" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="placaCarreta" className={labelStyles}>Placa Carreta:</label>
                <input id="placaCarreta" name="placaCarreta" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="rota" className={labelStyles}>Rota:</label>
                <input id="rota" name="rota" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="previsao" className={labelStyles}>Previsão.:</label>
                <input id="previsao" name="previsao" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="lacre" className={labelStyles}>Lacre:</label>
                <input id="lacre" name="lacre" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="liberacao" className={labelStyles}>Liberação:</label>
                <input id="liberacao" name="liberacao" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="averbacao" className={labelStyles}>Averbação.:</label>
                <input id="averbacao" name="averbacao" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="status" className={labelStyles}>Status:</label>
                <input id="status" name="status" className={inputStyles} type="text" />
              </div>
            </div>

            <label htmlFor="observacoes" className={labelStyles}>Observações:</label>
            <input id="observacoes" name="observacoes" className={inputStyles} type="text" />


            <h1 className="text-2xl text-gray-500 mt-4 mb-2 border-b w-full"><strong>Pedidos</strong></h1>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="pedido" className={labelStyles}>Pedido:</label>
                <input id="pedido" name="pedido" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="destinatario" className={labelStyles}>Destinatario:</label>
                <input id="destinatario" name="destinatario" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveNFe" className={labelStyles}>Chave NFe:</label>
                <input id="chaveNFe" name="chaveNFe" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveCTe" className={labelStyles}>Chave CTe.:</label>
                <input id="chaveCTe" name="chaveCTe" className={inputStyles} type="text" />
              </div>              
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="pedido" className={labelStyles}>Pedido:</label>
                <input id="pedido" name="pedido" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="destinatario" className={labelStyles}>Destinatario:</label>
                <input id="destinatario" name="destinatario" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveNFe" className={labelStyles}>Chave NFe:</label>
                <input id="chaveNFe" name="chaveNFe" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveCTe" className={labelStyles}>Chave CTe.:</label>
                <input id="chaveCTe" name="chaveCTe" className={inputStyles} type="text" />
              </div>              
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="pedido" className={labelStyles}>Pedido:</label>
                <input id="pedido" name="pedido" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="destinatario" className={labelStyles}>Destinatario:</label>
                <input id="destinatario" name="destinatario" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveNFe" className={labelStyles}>Chave NFe:</label>
                <input id="chaveNFe" name="chaveNFe" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chaveCTe" className={labelStyles}>Chave CTe.:</label>
                <input id="chaveCTe" name="chaveCTe" className={inputStyles} type="text" />
              </div>              
            </div>

            <button type="submit" className={buttonStyles}>Enviar</button>
          </form>
        </div>
      </main>
    </>
  )
}
