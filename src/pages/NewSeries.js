import React, { Component } from 'react'

import api from './../Api'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assistir',
}

class NewSeries extends Component {
  constructor(props) {
    super(props)

    this.handleSaveSeries = this.handleSaveSeries.bind(this)
  }

  state = {
    genres: [],
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadGenres()
      .then((res)=>{
        this.setState({
          isLoading: false,
          genres: res.data
        })
      })
  }

  handleSaveSeries(e) {
    e.preventDefault()

    const newSeries = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value,
    }

    api.saveSeries(newSeries)
      .then((res) => console.log(res))
  }

  render() {
    return (
      <section id="intro" className="intro-section">
        <h1>Nova Série</h1>

        <div className="col-md-6 col-md-offset-3">
          <form>
            Nome: <input type="text" ref='name' className="form-control" /><br />

            Status:
            <select className="form-control" ref='status'>
              { Object
                .keys(statuses)
                .map( key => <option key={key} value={key}>{statuses[key]}</option>)
              }
            </select> <br />

            Gênero:
            <select className="form-control" ref='genre'>
              {
                this.state.genres
                .map( genre => <option key={genre} value={genre}>{genre}</option>)
              }
            </select> <br />

            Comentários: <textarea className="form-control" ref='comments'></textarea><br />

            <button
              className="btn btn-primary pull-left"
              onClick={ (e) => this.handleSaveSeries(e) }
            >
              Salvar Série
            </button>
          </form>
        </div>
      </section>
    )
  }
}

export default NewSeries
