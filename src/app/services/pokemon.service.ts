import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

type Pokemon = {
  name: string,
  url: string,
}

type Teste<T> = {
  name: string,
  prop: T;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Array<Pokemon> = [];

  constructor(private httpClient: HttpClient) {
    this.carregarPokemons();
  }

  async carregarPokemons() {
    try {
      const requisicao = await lastValueFrom(
        this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon?limit=3')
      );
      //const pokemons = requisicao.results;
      console.log(requisicao); // O último valor emitido pelo Observable
      this.pokemons = requisicao.results as Pokemon[];
    } catch (error) {
      console.error(error); // Lida com erros, se houver
    }
  }
}
