import _ from '@lodash';

const EventModel = (data) =>
  _.defaults(data || {}, {
    detallePO: '',
    estilo: '',
    talla: '',
    color: '',
    fechainicio: '',
    fechafin: '',
    proceso: '',
    empleadoencargado: '',
    cantidad: '',
    lote: '',
    cantidadlote: '',
    extendedProps: { desc: '', label: '' },
  });

export default EventModel;
