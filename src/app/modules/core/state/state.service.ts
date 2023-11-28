import { Injectable } from '@angular/core';
import { State } from './state.class';
import { DatosGeneralesHistorico } from '../models/datos-generales-historico.model';
import { DatosEntrada } from '../models/datos-entrada.model';
import { DatosItemHistorico } from '../models/item-historico.model';
import { DatosInnerHistorico } from '../models/inner-historico.model';
import { DatosMasterHistorico } from '../models/master-historico.model';
import { Cedis } from '../models/cedis.model';

interface IState {
  datosEntrada:   DatosEntrada | null;
  cedisCatalog:   Array<Cedis> | null;
  datosGenerales: Array<DatosGeneralesHistorico> | null;
  datosItem:      Array<DatosItemHistorico> | null;
  datosInner:     Array<DatosInnerHistorico> | null;
  datosMaster:    Array<DatosMasterHistorico> | null;
}

const initialState: IState = {
  datosEntrada:   null,
  cedisCatalog:   null,
  datosGenerales: null,
  datosItem:      null,
  datosInner:     null,
  datosMaster:    null
};


@Injectable({
  providedIn: 'root'
})
export class StateService extends State<IState>{
  constructor() {
    super(initialState);
  }

  public resetState(): void {
    this.setCurrentState(initialState);
  }

  public setState(param: Partial<IState>) {
    this.setCurrentState({...this.currentState, ...param});
  }

  // Selectors
  public currentState$   = this.select(state => state);
  public cedisCatalog$   = this.select(state => state.cedisCatalog);
  public datosEntrada$   = this.select(state => state.datosEntrada);
  public datosGenerales$ = this.select(state => state.datosGenerales);
  public datosItem$      = this.select(state => state.datosItem);
  public datosInner$     = this.select(state => state.datosInner);
  public datosMaster$    = this.select(state => state.datosMaster);

}
