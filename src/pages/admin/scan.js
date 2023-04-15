import React, { useState } from 'react'
import Scanner from '@/Components/Scanner'

function scan() {
  const [txt, setTxt] = useState()

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedResult.result.text)
    setTxt(decodedResult.result.text)
  };
  return (
    <div>
      <Scanner
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  )
}

export default scan