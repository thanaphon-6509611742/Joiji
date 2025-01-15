function Queuebar({ setPages }) {

  return (
    <div className='justify-around text-black font-inter font-light text-3xl my-10 p-5'>
      <button onClick={() => setPages('All')} className="m-10">ALL</button>
      <button onClick={() => setPages('Home2')} className=" m-10">HOME 2</button>
      <button onClick={() => setPages('Queue3')} className=" m-10">QUEUE 3</button>
      <button onClick={() => setPages('History')} className="m-10 ">HISTORY</button>
    </div>
  );
}

export default Queuebar;