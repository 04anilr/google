
'use client'
import 'regenerator-runtime';
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { BiMicrophone } from "react-icons/bi";
import { BiSolidMicrophone } from "react-icons/bi";
import { BiSolidCamera } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Main: React.FunctionComponent = () => {
  const [search, setSearch] = useState<string>('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  const router = useRouter();
    const googleLogo: string = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

const onSearchSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
   e.preventDefault();
router.push(`https://www.google.com/search?q=${search}`);


}
const startListening = () => {
  SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
}
const stopListening = () => {
  SpeechRecognition.stopListening()
  setSearch(transcript);
}
  
if (!browserSupportsSpeechRecognition) {
  return null;
}

return (
  <div className="items-center flex flex-col mt-28"> 
  <Image
  src={googleLogo}
  alt="google"
  height={100}
  width={270}
  />
  <form 
  className="flex border mt-7 px-5 py-2 rounded-full w-2/5 items-center hover:shadow-md"
  onSubmit={(e) => onSearchSubmit(e)}
  >
  <FiSearch className="text-xl text-slate-400" />
    <input type="text"
    className="w-full focus:outline-none ml-4"
    onChange={(e) => setSearch(e.target.value)}
    value={search || transcript}
    />
   {
    listening ? (
    <BiSolidMicrophone
      className="text-3xl text-slate-400 mr-5" 
      onclick={() => stopListening()}
      />
      ) : (
      <BiMicrophone
    className="text-3xl text-slate-400 mr-5" 
    onclick={() => startListening()}
     />
    )
   }
    <BiSolidCamera className="text-3xl text-slate-400"/>
  </form>
  <div className="mt-7">
    <button
     className="bg-slate-100 mr-3 py-2 px-4 text-sm rounded hover:border"
     onClick={(e) => onSearchSubmit(e)}>Google Search</button>
    <button 
    className="bg-slate-100  py-2 px-4 text-sm rounded hover:border"
    onClick={() => router.push('https://doodles.google/')}>I'm Feeling Lucky</button>
  </div>
  </div>
)

}
export default Main;