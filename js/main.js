const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const gameboard = document.getElementById("gameboard");
const ULTIMO_NIVEL = 10;

let puntuacion = document.getElementById("puntos");
puntuacion.innerHTML = 0;
class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(() => {
      this.siguienteNivel();
    }, 500);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.inicializar = this.inicializar.bind(this);
    this.toggleBtnEmpezar();

    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }
  siguienteNivel() {
    setTimeout(() => {
      this.subnivel = 0;
      this.iluminarSecuencia();
      this.agregarEventosClick();
    }, 500);
  }
  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      let color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }
  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
  }
  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }
  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          puntuacion.innerHTML++;
          this.ganoElJuego();
          puntuacion.innerHTML = 0;
        } else {
          puntuacion.innerHTML++;
          if (this.nivel < 4) {
            this.mensaje = "Eso estuvo fácil";
          }
          if (this.nivel < 8) {
            this.mensaje = "Sigue así";
          } else {
            this.mensaje = "Estás muy cerca";
          }

          this.mensajeSiguienteNivel(this.nivel - 1, this.mensaje);
        }
      }
    } else {
      this.perdioElJuego();
      puntuacion.innerHTML = 0;
    }
  }
  mensajeSiguienteNivel(nivel, mensaje) {
    swal(`Nivel ${nivel}`, mensaje, "success").then(this.siguienteNivel);
  }
  ganoElJuego() {
    swal(
      "Ganaste!",
      "Eso estuvo increíble, inténtalo nuevamente",
      "success"
    ).then(this.inicializar());
    document.getElementById("gameboard").classList.add("girar");
  }
  perdioElJuego() {
    swal("Perdiste", "No te rindas, inténtalo nuevamente", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
      document.getElementById("gameboard").classList.add("girar");
    });
  }
}

function empezarJuego() {
  gameboard.classList.remove("girar");
  window.juego = new Juego();
}
