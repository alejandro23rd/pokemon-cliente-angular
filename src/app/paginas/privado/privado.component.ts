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
    
    //constructor vacio de pokemon
    console.debug(this.pokemon);
    this.pokemon = [];

    //constructor vacio de mensaje
    this.mensaje = '';

    //constructor vacio del formulario de pokemons
    this.formulario = this.fb.group({
      id: new FormControl(0),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
    this.nombreNuevo = '';

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
    console.log("seleccionarPokemon(" + pokemon.id + " " + pokemon.nombre + ")");
    
    this.pokemonSeleccionado = pokemon;
    this.formulario.get('nombre').setValue(this.pokemonSeleccionado.nombre); 
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

    const controlId = this.formulario.get('id');
    controlId.setValue( this.pokemonSeleccionado.id);
    this.formulario.get('nombre').setValue( this.pokemonSeleccionado.nombre);
    this.formulario.get('imagen').setValue( this.pokemonSeleccionado.imagen);

  }

  getID(formData){
    console.debug('coge el getID %o', formData);

    if(!this.pokemonSeleccionado){
      this.pokemonSeleccionado = new Pokemon();
      this.pokemonSeleccionado.nombre = formData.nombre;
      this.pokemonSeleccionado.imagen = formData.imagen;
      this.crear(this.pokemonSeleccionado);
      

    }else{
      this.pokemonSeleccionado.nombre = formData.nombre;
      this.pokemonSeleccionado.imagen = formData.imagen;
      this.pokemonSeleccionado.imagen = formData.imagen;
      this.modificar(this.pokemonSeleccionado);
      
      
    }
    
  }//getID

  crear(pokemon : Pokemon){
    console.trace('Entra a crear');

    this.servicioPokemon.crearPokemon(pokemon).subscribe( data => {
    console.debug('Nueva Pokemon creado %o', data);
    this.cargarPokemon();
    this.mensaje = 'Pokemon registrado con Exito!!!';
    this.showMensaje = true;
    });

  }//crear

  modificar(pokemon: Pokemon): void {
    console.debug('loose focus para cambiar nombre %o', pokemon);
    this.servicioPokemon.modificarPokemon(pokemon).subscribe( () => {
      this.seleccionarPokemon(pokemon);
      this.cargarPokemon();
    }); 

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

        this.habilidad = datoshabilidad;

        // TODO si hay un pokemon seleccionado, marcar las que estan chekeadas.
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

  SeleccionarHabilidad( option: any ) {
    
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
}
