import React from 'react'

function Footer() {
  return (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    ©
                    {new Date().getFullYear()} Byte. all rights
                    reserved.
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer