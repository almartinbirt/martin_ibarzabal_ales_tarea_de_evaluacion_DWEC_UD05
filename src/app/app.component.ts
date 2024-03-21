import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Configuracion {
  nombre?: string;
  apellido?: string;
  rango?: number;
  intentos?: number;
  numeroAleatorio?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  configuracion: Configuracion = {
    rango:  0,
    intentos: 0
  };

  intentosRestantes: number = 0;
  numeroIngresado: number = -1;
  numerosIngresados: number[] = [];
  recogerDatosOK: boolean = false;
  verificarDatosOK: boolean = false;
  resultado: boolean = false;
  numero: number = 0;

  recogerDatos(): void {

    if (!this.configuracion.nombre || !this.configuracion.apellido || Number(this.configuracion.rango) < 1 || Number(this.configuracion.intentos) < 1) {
      alert('Por favor complete todos los campos');
      this.recogerDatosOK = false;
      return;
    }

    this.configuracion.numeroAleatorio = Math.floor(Math.random() * (Number(this.configuracion.rango) + 1));
    this.intentosRestantes = Number(this.configuracion.intentos);

    this.numerosIngresados = [];
    this.recogerDatosOK = true;

    console.log("Configuracion", this.configuracion);

  }

  verificarNumero(): void {

    this.verificarDatosOK = true;

    if(this.intentosRestantes>0){
      this.numerosIngresados.push(this.numeroIngresado);
      this.intentosRestantes--;

      if(this.numeroIngresado===this.configuracion.numeroAleatorio) {
        this.resultado = true;
      } else if (this.numeroIngresado < 0 || this.numeroIngresado  > (Number(this.configuracion.rango)) ) {
        alert("El número introducido no está en en el rango de números generados.");
        return
      }
    }

  }

  filtroNumeros(event: KeyboardEvent) {
    const tecla = event.key;
    if (['.',','].includes(tecla)) {
      event.preventDefault();
    }
  }

  filtroLetras(event: KeyboardEvent) {
    const tecla = event.key;
    if (['0','1','2','3','4','5','6','7','8','9'].includes(tecla)) {
      event.preventDefault();
    }
  }

}
