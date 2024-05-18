import React, { useEffect, useState } from "react"
import imageDefault from './assets/background.png'
import Navbar from "./components/Navbar"


const fileReader = new FileReader()

function App() {

  const [image, setImage] = useState(imageDefault)

  useEffect(() => {
    const loadImage = () => {
      setImage(fileReader.result as string)
    }
    fileReader.onload = loadImage
  }, [])


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.target as HTMLFormElement)
  }


  const handleImage = (event: React.FocusEvent<HTMLInputElement>) => {    
    const form = event.target.parentNode
    const formData = new FormData(form as HTMLFormElement)
    const file = formData.get("imagen") as File
    fileReader.readAsDataURL(file)
  }


  return <div className="container border">
    <Navbar />
    <div className="row py-2">
      <div className="col-md-8"></div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit} encType="form-data/multipart">
              <input type="file" name="imagen" onChange={handleImage} accept=".jpg" />
              <img src={image} alt="" className="img-fluid" />
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary btn-lg" type="button">Subir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default App