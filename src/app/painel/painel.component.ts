import { Component, OnInit, EventEmitter,  Output, OnDestroy} from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES} from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a Frase'
  public resposta: string  = ''

  public rodada: number = 0
  public rodadaFrase: Frase = this.frases[this.rodada]

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    this.atualizaRodada()

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta){
      alert('A tradução está correta')
      //trocar pergunta da rodada
      this.rodada++

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      //Sucesso
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

      

    } else {
      alert('A tradução está errada')
      //diminuir a variável tentativas
      this.tentativas--

      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  public atualizaRodada(): void{

    //define a frase da rodada com base em alguma lógica 
    this.rodadaFrase = this.frases[this.rodada]
    //limpar a resposta
    this.resposta = ''
  }
}
