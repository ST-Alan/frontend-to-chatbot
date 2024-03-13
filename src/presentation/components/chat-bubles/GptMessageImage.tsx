
interface Props{
    text:string;
    imageUrl:string;
    alt: string; // Texto alternaitvo
    onImageSelected?: (imageUrl:string)=>void;
}

export const GptMessageImage = ({imageUrl, alt, onImageSelected}:Props) => {
  return (
    <div className="col-start-1 col-end-11 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-auto p-3 rounded-full bg-green-600 flex-shrink-0">
               AleximGPT 
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-3 shadow rounded-xl">
              {/* <span>{text}</span> */}
              <img
                src = {imageUrl}
                alt = {alt}
                className="rounded-xl w-96 h-96 object-cover"
                onClick={()=> onImageSelected && onImageSelected(imageUrl)}
              />
            </div>
        </div>
    </div>
  )
}