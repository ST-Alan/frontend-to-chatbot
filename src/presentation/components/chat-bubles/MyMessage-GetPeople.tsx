import { GetIDPeople } from "../../../interfaces";

interface Props{
    text: GetIDPeople | string;
}

export const MyMessageGetPeople = ({text}:Props) => {
    const displayText = typeof text === 'string' 
    ? text 
    : `Obtener el id del Film ===============`;
    return (
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
              <div className="flex items-center justify-center h-10 w-auto p-3 rounded-full bg-indigo-500 flex-shrink-0">
                 Alan Fermin
              </div>
              <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
                  <div>{displayText}</div>
              </div>
          </div>
      </div>
    )
  }