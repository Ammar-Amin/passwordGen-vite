import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // four elements jiske change hone pr re-render hoga
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook for taking ref of password in our copy btn
  const passwordRef = useRef(null)

  // useCallback will optimize our code br remembering the value
  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed == true) str += "1234567890"
    if (charAllowed == true) str += "!@#$%^&*()*+-/"

    // loop length ki value times chalega
    for (let i = 1; i <= length; i++) {
      let value = Math.floor(Math.random() * str.length + 1);
      // str me random idx (value) daal k apan ek value utha lege & pass me concate krge
      pass += str.charAt(value);
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed,])

  const copyPassword = useCallback(() => {
    // alert('Password copied successfully')
    // will give us the css effect of copy an element i.e. backgroundColor: lightblue;
    passwordRef.current?.select();
    // passwordRef.current?.setSelectRange(0,4); // will select form 0 to 4 
    window.navigator.clipboard.writeText(password); // copy our password to clipboard 
  }, [password])

  // This will call our passwordGenerator() eachtime, wheneven our elements inside the array will be changed
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed,])

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg
        px-4 py-4 my-12 bg-slate-900'>
        <h1 className='text-4xl text-center text-white font-bold'>
          Password Generator</h1 >
        <div className='flex shadow-md rounded-lg overflow-hidden mt-9 mb-5' >
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='Password'
            ref={passwordRef}
            readOnly
          ></input>
          <button
            className='py-0.5 px-3 bg-green-700 text-white shrink-0 hover:bg-green-800'
            onClick={copyPassword}
          >Copy</button>
        </div >

        <div className='w-4/5 mx-auto flex flex-col items-center gap-2 sm:w-auto sm:flex-row sm:justify-evenly'>
          <div className="flex item-center gap-1">
            <input
              type='range'
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              // range change hogi to (event.target.value) k andr aegi changed value hr br 
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <label className='text-white'>Length:({length})</label>
          </div>

          <div className='w-full flex justify-evenly sm:w-auto sm:gap-2'>
            <div className="flex item-center gap-1">
              <input
                type='checkbox'
                defaultChecked={numAllowed}
                // setNumAllowed(true) // aise true kruga to hr br k liye true ho jaigi value
                onChange={() => setNumAllowed((prev) => !prev)}
              ></input>
              <label className='text-white'>Number</label>
            </div>

            <div className="flex item-center gap-1">
              <input
                type='checkbox'
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              ></input>
              <label className='text-white'>Special Char</label>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
