import data from "./data.json";
import React, { Component } from "react";
import Opciones from "./Opciones";
import Recordatorio from "./Recordatorio";
import Swal from "sweetalert2";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      historial: [],
      contador: 0,
      seleccionAnterior: "",
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.contador !== this.state.contador) {
      this.state.historial.push(this.state.seleccionAnterior)
    }
  }

  handleClick = (e) => {
    const id = e.target.id;
    if (this.state.contador >= 7) {
      Swal.fire({
        title: 'El recorrido ha terminado',
        text: "¿Quiere volver al inicio?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#4c2882',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver'
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      });
    } else if (id === 'A') {
      this.setState({
        contador: ++this.state.contador,
        seleccionAnterior: 'A',
      });
    } else if (id === 'B') {
      this.setState({
        contador: ++this.state.contador,
        seleccionAnterior: 'B',
      });
    }
  };

  render() {
    return (
      <div className="layout">
        <h1 className="historia">{data[this.state.contador].historia}</h1>
        <Opciones
          handleClick={this.handleClick}
          opcionA={data[this.state.contador].opciones.a}
          opcionB={data[this.state.contador].opciones.b}
        />
        <Recordatorio
          seleccionAnterior={this.state.seleccionAnterior}
          historial={this.state.historial.map(
            (e, index) => (
              <li key={index}>{e}</li>
            ),
            data[this.state.contador].id
          )}
        />
      </div>
    );
  }
}
export default Main;