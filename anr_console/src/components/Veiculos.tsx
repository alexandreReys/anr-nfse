const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
const buttonStyles = 'flex w-full justify-center text-white bg-blue-600 p-3 rounded font-bold mt-6';
const labelStyles = 'w-30 inline-block mt-2';

export default function Veiculos() {

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto pt-4 pb-1 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Veiculos</h1>
        </div>
      </header>

      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleFormSubmit} className="max-w-full">
            
            <label htmlFor="placa" className={labelStyles}>Placa:</label>
            <input id="placa" name="placa" className={inputCodeStyles} type="text" />

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="marca" className={labelStyles}>Marca:</label>
                <input id="marca" name="marca" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="modelo" className={labelStyles}>Modelo:</label>
                <input id="modelo" name="modelo" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="ano" className={labelStyles}>Ano:</label>
                <input id="ano" name="ano" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="especie" className={labelStyles}>Especie:</label>
                <input id="especie" name="especie" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="capacidade" className={labelStyles}>Capac./Pot./Cil.:</label>
                <input id="capacidade" name="capacidade" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="categoria" className={labelStyles}>Categoria:</label>
                <input id="categoria" name="categoria" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="via" className={labelStyles}>Via:</label>
                <input id="via" name="via" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="renavan" className={labelStyles}>Renavan:</label>
                <input id="renavan" name="renavan" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="chassis" className={labelStyles}>Chassis:</label>
                <input id="chassis" name="chassis" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="exercicio" className={labelStyles}>Exercicio:</label>
                <input id="exercicio" name="exercicio" className={inputStyles} type="text" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="ipva" className={labelStyles}>IPVA:</label>
                <input id="ipva" name="ipva" className={inputStyles} type="text" />
              </div>
              
              <div className="flex-1">
                <label htmlFor="localEmplac" className={labelStyles}>Local Emplac.:</label>
                <input id="localEmplac" name="localEmplac" className={inputStyles} type="text" />
              </div>

              <div className="flex-1">
                <label htmlFor="dataEmplac" className={labelStyles}>Data Emplac.:</label>
                <input id="dataEmplac" name="dataEmplac" className={inputStyles} type="text" />
              </div>
            </div>

            <label htmlFor="observacoes" className={labelStyles}>Observações:</label>
            <input id="observacoes" name="observacoes" className={inputStyles} type="text" />

            <button type="submit" className={buttonStyles}>Enviar</button>
          </form>
        </div>
      </main>
    </>
  )
}
