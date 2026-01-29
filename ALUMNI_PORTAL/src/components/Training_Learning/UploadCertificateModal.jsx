import React, { useState } from 'react'

export default function UploadCertificateModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  if (!isOpen) return null

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    setFile(f)
    setProgress(0)
  }

  function startUpload() {
    if (!file) return
    setProgress(5)
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 20) + 10)
        if (next >= 100) clearInterval(iv)
        return next
      })
    }, 250)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[720px] max-w-[95%] bg-white rounded-xl shadow-lg p-6">
        <div className="border-2 border-dashed border-yellow-300 rounded-md h-56 flex items-center justify-center mb-6">
          <div className="text-center text-gray-600">
            <div className="text-4xl text-[#D4AA12] mb-2">☁️</div>
            <div className="text-lg font-medium">Browse Files to upload</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-[#F3DF9F] flex items-center justify-center">📄</div>
              <div className="text-sm text-gray-600">{file ? file.name : 'No selected File -'}</div>
            </div>
            <input type="file" onChange={handleFile} className="hidden" />
          </label>
          <button onClick={() => { setFile(null); setProgress(0) }} className="text-gray-500">🗑️</button>
        </div>

        <div className="h-3 bg-gray-200 rounded-full mb-6">
          <div className="h-3 bg-yellow-400 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">CANCEL</button>
          <button onClick={startUpload} className="px-4 py-2 rounded-md bg-yellow-500 text-white">UPLOAD</button>
        </div>
      </div>
    </div>
  )
}
