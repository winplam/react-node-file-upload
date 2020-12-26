import React, { Component } from 'react'
import axios from 'axios'

export default class FilesUploadComponent extends Component {
  constructor (props) {
    super(props)
    this.onFileChange = this.onFileChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      profileImg: ''
    }
  }

  onFileChange (e) {this.setState({ profileImg: e.target.files[0] })}

  onSubmit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', this.state.profileImg)
    axios.post('http://localhost:4000/api/user-profile', formData, {}).then(res => {
      console.log(res)
    })
  }

  render () {
    const date = new Date()
    const formattedDate = date.toLocaleString()
    return (
      <>
        {formattedDate.toLocaleString()}
        <form onSubmit={this.onSubmit}>
          <br/><input type="file" onChange={this.onFileChange}/>
          <br/>
          <button type="submit">Upload</button>
        </form>
      </>
    )
  }
}