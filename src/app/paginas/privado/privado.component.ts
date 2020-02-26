import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  //variables de pokemon
  pokemon: Array<Pokemon>;
  pokemonSeleccionado: any;

  //variable busqueda
  busqueda: string;
  

  //variables de formulario
  formulario: FormGroup;


  //variables de mensajes
  mensaje: string;
  showMensaje: boolean;

  //variables de crear nuevo pokemon
  nombreNuevo: string;

  //variables de habilidades
  habilidad: Array<Habilidad>;
  formArrayHabilidades: FormArray;

  constructor(private servicioPokemon : PokemonService, private servicioHabilidad : HabilidadService, private fb: FormBuilder ) {
    console.trace('PrivadoComponent constructor');
    
    this.busqueda = '';

    //constructor vacio de pokemon
    console.debug(this.pokemon);
    this.pokemon = [];

    //constructor vacio de mensaje
    this.mensaje = '';

    //constructor vacio del formulario de habilidades
    this.crearFormulario();

  }//constructor

  ngOnInit() {
    console.trace('PrivadoComponent ngOnInit');
    this.cargarPokemon();
    this.cargarHabilidad();

    this.pokemonSeleccionado = new Pokemon();
    
  }//ngOnInit


  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon(" + pokemon.id + " " + pokemon.nombre + " " + pokemon.imagen + ")");
    
    this.pokemonSeleccionado = pokemon;
    this.rellenarDatos();
    this.cargarHabilidad();
  
  }// seleccionarReceta
  

  private cargarPokemon(): void {
    console.trace('cargarPokemon');
    // llamar al service para obtener tareas
    this.servicioPokemon.getAllPokemon().subscribe(
      datos => {
        console.debug('esto se ejecuta de forma asincrona');
        this.pokemon = datos;
      },
      error => {
        console.warn('Servico Rest no funciona %o', error);
      });
  }// cargarPokemon


  eliminarpokemon(pokemon: Pokemon) {
    console.debug('click Liberar %o', pokemon);

    if ( confirm('¿Estas seguro?') ) {
      console.trace('Confirmada la liberacion');
      this.servicioPokemon.eliminarPokemon( pokemon.id ).subscribe( () => {
        this.mensaje = `Has liberado la pokemon con ID [${pokemon.id}] con el titulo: ${pokemon.nombre}`;
        this.showMensaje = true;
        this.cargarPokemon();
      });

    } else {
      console.trace('Cancelada la liberacion');
    }

  }// eliminar

  rellenarDatos() {
    console.debug('click rellenarDatos');

    this.crearFormulario();

    const controlId = this.formulario.get('id');
    controlId.setValue( this.pokemonSeleccionado.id);
    this.formulario.get('nombre').setValue( this.pokemonSeleccionado.nombre);
    this.formulario.get('imagen').setValue( this.pokemonSeleccionado.imagen);

    //TODO relelnar habilidades
    
    this.pokemonSeleccionado.habilidades.forEach(element => {
      const habilidad = this.crearFormGroupHabilidad();
      habilidad.get('id').setValue( element.id );
      habilidad.get('nombre').setValue( element.nombre );

      this.formArrayHabilidades.push(habilidad);
    });


  }

  getID(pokemon){
    console.debug('coge el getID %o', pokemon);

    if(this.pokemonSeleccionado.id === 0){


      this.crear(pokemon);
      

    }else{

      this.modificar(pokemon);
      
    }
    
  }//getID

  crear(pokemon : Pokemon){
    console.trace('Entra a crear');

    this.servicioPokemon.crearPokemon(pokemon).subscribe(
      data => {
        console.debug('pokemon creado ok %o', data);

        this.cargarPokemon();
        this.cargarHabilidad();
        this.seleccionarPokemon(pokemon);
      },
      error => {
        console.warn(error);
      }
    );

  }//crear

  modificar(pokemon: Pokemon): void {
    console.debug('loose focus para cambiar nombre %o', pokemon);
    this.servicioPokemon.modificarPokemon(pokemon).subscribe(
      data => {
        console.debug('elemento modificado ok %o', data);

        this.cargarPokemon();
        this.cargarHabilidad();
        this.seleccionarPokemon(pokemon);
        console.debug(pokemon);
      },
      error => {
        console.warn(error);
      }
    ); 

  }//modificar

  private crearFormulario() {

    this.formulario = this.fb.group({
      id: new FormControl(0),
      nombre: new FormControl('',
                              Validators.compose(
                                  [
                                    Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(50)
                                  ])
                              ),
      imagen: new FormControl('',
                              Validators.compose(
                                  [
                                    Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(200)
                                  ])
                              ),
                              
      habilidades:  this.fb.array( [],
                                  Validators.compose(
                                    [
                                      Validators.required,
                                      Validators.minLength(1)
                                    ])
                                )
    });

    this.formArrayHabilidades = this.formulario.get('habilidades') as FormArray;

  }// crearFormulario


  private cargarHabilidad(): void {
    console.trace('cargarHabilidad');
    // llamar al service para obtener tareas
    this.servicioHabilidad.getAllHabilidad().subscribe(
      datoshabilidad => {

        //obtiene el listado de habilidades
        this.habilidad = datoshabilidad;

        // si hay un pokemon seleccionado, selecciona sus habilidades
        if (this.pokemonSeleccionado) {

          this.habilidad = this.habilidad.map(h => {
            console.debug('map');
            const posicion = this.pokemonSeleccionado.habilidades.findIndex(el => el.id === h.id);

            console.debug('checked');
            if (posicion !== -1) {
              h.checked = true;
            } else {
              h.checked = false;
            }

            return h;
          });

        }
      },
      error => {
        console.warn('Servico Rest no funciona %o', error);
      });
  }// cargarHabilidad

  seleccionarHabilidad( option: any ) {
    
    option.checked = !option.checked;
    console.debug('checkCambiado %o', option);

    const habilidad = this.crearFormGroupHabilidad();
    habilidad.get('id').setValue( option.id );
    habilidad.get('nombre').setValue( option.nombre );

    if(option.checked == false){
      this.formArrayHabilidades.removeAt(this.formArrayHabilidades.value.findIndex(el => el.id === option.id));
    }else{
      this.formArrayHabilidades.push(habilidad);
    }

  }// checkCambiado

  private crearFormGroupHabilidad(): FormGroup {
    return this.fb.group({
              id: new FormControl(0),
              nombre: new FormControl(''),
              imagen: new FormControl('')
            });
  }//crearFormGroupHabilidad()

  clear() {

    this.crearFormulario();
    this.pokemonSeleccionado = new Pokemon();
    this.habilidad.map(el => el.checked = false);
  }//Clear

}
