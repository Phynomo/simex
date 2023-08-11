/* eslint-disable camelcase */
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Icon,
  InputLabel,
  TextField,
  Typography,
  Select,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  Switch,
  Stack,
  Autocomplete,
  TextareaAutosize,
} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { black, blue } from "tailwindcss/colors";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import { InputAdornment } from "@material-ui/core";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table, Input } from 'antd';
import { keyBy } from 'lodash';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from "sweetalert2";
import { Today } from "@material-ui/icons";

const TextArea = Input.TextArea

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "red",
  width: 400,
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Toast2 = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "orange",
  width: 400,
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

let renderCount = 0;

const tab1Fields = {
  NoCorrelativoReferencia: "",
  AduanaRegistro: "",
  AduanaDestino: "",
  RegimenAduanero: "",
  Modalidad: "",
  Clase: "",
  FechaVencimiento: null,
  PaisProcedencia: "",
  PaisDestino: "",
  DepositoAduanero: "",
  LugarDesembarque: "",
  Manifiesto: "",
  Titulo: ""
};

const tab2Fields = {
  Codigo: "",
  Nombre: "",
  ModoTransporte: "",
  NoIdentificador: "",
  NoLicenciaConducir: "",
  PaisExpedicion: "",
  NombresApellidos: "",
  IdUnidadTransporte: "",
  PaisRegistro: "",
  Marca: "",
  ChasisVin: "",
  IdentificacionRemolque: "",
  CantidadUnidadesCarga: "",
  NumeroDispositivo: "",
  Equipamiento: "",
  TamañoEquipamiento: "",
  TipoCarga: "",
  NIdentificacionContenedor: "",
};

const tab3Fields = {
  Items: "",
  CantidadBultos: "",
  ClaseBulto: "",
  PesoNeto: "",
  PesoBruto: "",
  CuotaContingente: "",
  Acuerdo: "",
  CriterioParaOrigen: "",
  ReglasAccesorias: "",
  ValorTransaccion: "",
  GastosTransporte: "",
  Seguro: "",
  OtrosGastos: "",
  ValorAduana: "",
  CodigoTipoDocumento: "",
  NumeroDocumento: "",
  EmisionDocumento: "",
  FechaVencimiento: "",
  PaisEmision: "",
  Linea: "",
  AutoridadEntidad: "",
  Monto: "",
  Observaciones: "",
};

const schemaTab1Fields = yup.object().shape({
  NoCorrelativoReferencia: yup.string().required(),
  AduanaRegistro: yup.string().required(),
  AduanaDestino: yup.string().required(),
  RegimenAduanero: yup.string().required(),
  Modalidad: yup.string().required(),
  Clase: yup.string().required(),
  FechaVencimiento: yup.date().required(),
  PaisProcedencia: yup.string().required(),
  PaisDestino: yup.string().required(),
  DepositoAduanero: yup.string().required(),
  LugarDesembarque: yup.string().required(),
  Manifiesto: yup.string().required(),
  Titulo: yup.string().required(),
});

const schemaTab2Fields = yup.object().shape({
  Codigo: yup.string().required(),
  Nombre: yup.string().required(),
  ModoTransporte: yup.string().required(),
  NoIdentificador: yup.string().required(),
  NoLicenciaConducir: yup.string().required(),
  PaisExpedicion: yup.string().required(),
  NombresApellidos: yup.string().required(),
  IdUnidadTransporte: yup.string().required(),
  PaisRegistro: yup.string().required(),
  Marca: yup.string().required(),
  ChasisVin: yup.string().required(),
  IdentificacionRemolque: yup.string().required(),
  CantidadUnidadesCarga: yup.string().required(),
  NumeroDispositivo: yup.string().required(),
  Equipamiento: yup.string().required(),
  TamañoEquipamiento: yup.string().required(),
  TipoCarga: yup.string().required(),
  NIdentificacionContenedor: yup.string().required(),
});

const schemaTab3Fields = yup.object().shape({
  Items: yup.string().required(),
  CantidadBultos: yup.string().required(),
  ClaseBulto: yup.string().required(),
  PesoNeto: yup.string().required(),
  PesoBruto: yup.string().required(),
  CuotaContingente: yup.string().required(),
  Acuerdo: yup.string().required(),
  CriterioParaOrigen: yup.string().required(),
  ReglasAccesorias: yup.string().required(),
  ValorTransaccion: yup.string().required(),
  GastosTransporte: yup.string().required(),
  Seguro: yup.string().required(),
  OtrosGastos: yup.string().required(),
  ValorAduana: yup.string().required(),
  CodigoTipoDocumento: yup.string().required(),
  NumeroDocumento: yup.string().required(),
  EmisionDocumento: yup.string().required(),
  FechaVencimiento: yup.string().required(),
  PaisEmision: yup.string().required(),
  Linea: yup.string().required(),
  AutoridadEntidad: yup.string().required(),
  Monto: yup.string().required(),
  Observaciones: yup.string().required(),
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function DucaCrear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
    tab3: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { handleSubmit, register, reset, control, formState, watch } = useForm({
    tab1Fields,
    mode: "all",
    resolver: yupResolver(schemaTab1Fields),
  });

  const { handleSubmit: handlesubmit1, reset: reset1, control: control1, formState: formState1 } = useForm({
    tab2Fields,
    mode: "all",
    resolver: yupResolver(schemaTab2Fields),
  });

  const { handleSubmit: handlesubmit2, reset: reset2, control: control2, formState: formState2 } = useForm({
    tab3Fields,
    mode: "all",
    resolver: yupResolver(schemaTab3Fields),
  });

  const { isValid, dirtyFields, errors } = formState;
  const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;
  const { isValid: isValid2, dirtyFields: dirtyFields2, errors: errors2 } = formState2;
  renderCount += 1;

  const vv = watch()

  function validacion() {
    if (formState.isValid == true) {
      setValue(1)
    }
  };

  const regimenAduenaro = [
    { label: '4000', id: 1 },
    { label: '8000', id: 2 },
    { label: '8100', id: 3 },
  ];

  const aduanas = [
    { value: 1, label: "0001-ADUANA AMAPALA" },
    { value: 2, label: "0002-ADUANA LA CEIBA" },
    { value: 3, label: "0003-ADUANA PUERTO HENECAN-SN LORENZO" },
    { value: 4, label: "0004-ADUANA PUERTO CORTES" },
    { value: 5, label: "0005-ADUANA PUERTO LEMPIRA" },
    { value: 6, label: "0006-ADUANA ROATAN" },
    { value: 7, label: "0007-GUARDATURA ROATAN" },
    { value: 8, label: "0008-ADUANA TELA" },
    { value: 9, label: "0009-ADUANA PUERTO CASTILLA" },
    { value: 10, label: "0010-GUARDATURA GOLOSON-CEIBA" },
    { value: 11, label: "0011-ADUANA LA MESA" },
    { value: 12, label: "0013-GUARDATURA LA MESA" },
    { value: 13, label: "0014-ADUANA TONCONTIN" },
    { value: 14, label: "0015-GUARDATURA TONCONTIN" },
    { value: 15, label: "0016-PASO FRONTERIZO CORINTO HN-GT" },
    { value: 16, label: "0017-ADUANA PALMEROLA" },
    { value: 17, label: "0018-GUARDATURA PALMEROLA" },
    { value: 18, label: "0020-ADUANA AGUA CALIENTE" },
    { value: 19, label: "0021-ADUANA MOCALEMPA" },
    { value: 20, label: "0022-ADUANA LA CONCORDIA" },
    { value: 21, label: "0023-ADUANA EL AMATILLO" },
    { value: 22, label: "0024-ADUANA EL FLORIDO" },
    { value: 23, label: "0025-ADUANA EL POY" },
    { value: 24, label: "0027-ADUANA LA FRATERNIDAD" },
    { value: 25, label: "0029-ADUANA GUASAULE" },
    { value: 26, label: "0034-ADUANA LAS MANOS" },
    { value: 27, label: "3004-ADUANA TECUN UMAN" },
    { value: 28, label: "6001-ZOLI PUERTO CORTES" },
    { value: 29, label: "6003-ZOLI INHDELVA" },
    { value: 30, label: "6005-CONSTRUCCIONES Y DESARROLLOS VICTOR" },
    { value: 31, label: "6011-HONDURAS AMERICAN TABACO SA (HATSA)" },
    { value: 32, label: "6012-CONFECCIONES INTERNACIONALES S.A. DE C.V." },
    { value: 33, label: "6013-ZOLI NOVEM CAR" },
    { value: 34, label: "6017-ZOLI DELI DE HONDURAS S.A. DE C.V." },
    { value: 35, label: "6021-ZOLI EMPACADORA DE CAMARONES SANTA INES" },
    { value: 36, label: "6022-ZOLI EMPACADORA DE PRODUCTO ACUATICOS SAN LORENZO" },
    { value: 37, label: "6023-ZOLI HATSA (DANLI)" },
    { value: 38, label: "6029-ZOLI CONFECCIONES MONZINI S.A." },
    { value: 39, label: "6030-ZOLI METROPOLITANA JACALEAPA" },
    { value: 40, label: "6035-ZOLI ORVASA" },
    { value: 41, label: "6043-ZOLI COMPONENTES ELECTRONICOS" },
    { value: 42, label: "6045-ZOLI CLASIF. Y EXPORT. TABACO" },
    { value: 43, label: "6047-ZOLI IBEROAMERICANA DE MARISCO" },
    { value: 44, label: "6048-ZOLI CARACOL KNITS" },
    { value: 45, label: "6056-ASTRO CARTON HONDURAS SA DE CV" },
    { value: 46, label: "6059-ZOLI MANUFACTURERA CEIBEÑA" },
    { value: 47, label: "6060-ZOLI ATUTO" },
    { value: 48, label: "6064-ZOLI TABACOS DE DANLI" },
    { value: 49, label: "6065-ZOLI COTTONWISE TEXTILES HOND." },
    { value: 50, label: "6067-ZOLI WOONG CHUN HOND.S.A." },
    { value: 51, label: "6068-ZONA LIBRE HONDURAS SA DE CV" },
    { value: 52, label: "6073-ZOLI ZIP SAN MIGUEL VI" },
    { value: 53, label: "6074-PARQUE INDUSTRIAL BUFALO S.A." },
    { value: 54, label: "6075-GRUPO J SOCIEDAD ANONIMA" },
    { value: 55, label: "6077-ZONA INDUSTRIAL DE EXPORTACION BUENAVISTA SA" },
    { value: 56, label: "6078-ZOLI ZIP CHOLOMA" },
    { value: 57, label: "6079-ZIP EL PORVENIR" },
    { value: 58, label: "6083- ZOLI LEAR AUTOMOTIVE EDDS, HOND." },
    { value: 59, label: "6085-ZOLI ZIP SAN JOSE" },
    { value: 60, label: "6091-ZOLI GRANDWAY HONDURAS, S. DE R.L." },
    { value: 61, label: "6093-ZOLI U.S. YACHTS S. DE R.L." },
    { value: 62, label: "6095-ZOLI ZIP CALPULES" },
    { value: 63, label: "6100-ZOLI AQUAFINCA ST. PETER FISH" },
    { value: 64, label: "6102-AEREO -IMPEX S.A." },
    { value: 65, label: "6103-ZOLI C.B.I., S.A." },
    { value: 66, label: "6106-ZOLI. CIA. OPERAD.ZIP RIO BLANCO" },
    { value: 67, label: "6107-ZOLI EMPACADORA LITORAL, S.A." },
    { value: 68, label: "6108-NEW HOLLAND LINGERIE DE HONDURAS SA" },
    { value: 69, label: "6109-ZOLI AMERICA S.A. DE C.V." },
    { value: 70, label: "6110-ZOLI AGENCIA J. E HANDAL S.A DE C.V" },
    { value: 71, label: "6114-ZOLI PARQUE INDUSTRIAL REAL" },
    { value: 72, label: "6118-ZOLI HONDURAS ELECT. DISTRIB. SYST." },
    { value: 73, label: "6121-ZOLI S. HONDURAS" },
    { value: 74, label: "6125-ZOLI GAS DEL CARIBE, S.A. DE C.V." },
    { value: 75, label: "6126-ZOLI INVERSIONES EL CACAO" },
    { value: 76, label: "6129-ZOLI  R.L.A. MANUFACTURING, SRL" },
    { value: 77, label: "6131-ZOLI FARM FRESH, S.A." },
    { value: 78, label: "6132-ZOLI ZINMA EXPORT" },
    { value: 79, label: "6136-ZOLI GOLFO AZUL" },
    { value: 80, label: "6137-ZOLI BANG SAN  HONDURAS, S. DE R.L." },
    { value: 81, label: "6138-ZOLI MICROENVASES" },
    { value: 82, label: "6142-ZOLI FOSFORERA CENTROAMERICANA" },
    { value: 83, label: "6143-ZOLI  ALAMODE S.A." },
    { value: 84, label: "6145-ZOLI TEXTILE SUPLY SERVICE S.ADE CV" },
    { value: 85, label: "6146-ZOLI INVERSIONISTAS Y EXPORTADORES" },
    { value: 86, label: "6148-ZOLI H.M.M DE HONDURAS S.A DE C.V" },
    { value: 87, label: "6149-ZOLI YODECO DE HONDURAS S A BUFALO" },
    { value: 88, label: "6154-ZOLI YODECO (YORO)" },
    { value: 89, label: "6155-ZOLI YODECO DE HONDURAS S.A OLANCHO" },
    { value: 90, label: "6159-ZOLI EL POLVORIN, S.A. DE C.V." },
    { value: 91, label: "6160-AEREO -IMPEX S.A." },
    { value: 92, label: "6161-ZOLI PRIDE, S.A. DE C.V." },
    { value: 93, label: "6162-ZOLI SER.PROF. MADERA (SERPROMA)" },
    { value: 94, label: "6163-ZOLI TECNOSUPPLIER S. DE R.L." },
    { value: 95, label: "6164-ZONA INDUST. DE EXPORT. CHOLOMA II" },
    { value: 96, label: "6165-ZOLI ZIP AMARATECA" },
    { value: 97, label: "6166-ZOLI GREEN VALLEY INDUSTRIAL PARK" },
    { value: 98, label: "6169-NOVA CHEM S DE RL DE CV" },
    { value: 99, label: "6172-ZOLI J.C. INTERNAT. INDUST. LAUNDRY" },
    { value: 100, label: "6175-ZOLI ALIMENTOS CONCENTRADOS  NACI." },
    { value: 101, label: "6176-ZOLI MADERAS DE AMERICA" },
    { value: 102, label: "6177-ZOLI VESTA TRADING SA" },
    { value: 103, label: "6178-ZOLI MARTEX FIBER INTERNATIONAL SRL" },
    { value: 104, label: "6179-ZOLI CENTRAL TEXTILES" },
    { value: 105, label: "6180-ZOLI LA FLOR DE COPAN SAS" },
    { value: 106, label: "6182-ZOLI DE SULA S.A." },
    { value: 107, label: "6184-ZOLI MARISCOS PERLA MAR, SRL" },
    { value: 108, label: "6185-ZOLI INVERSIONES MATERIALES, SRL" },
    { value: 109, label: "6186-ZOLI GILDAN HOND. HOSIERY FACTORY" },
    { value: 110, label: "6187-ZOLI GILDAN CHOLOMA TEXTILES, S.A." },
    { value: 111, label: "6188-RECYCLERS GROUP OF HONDURAS S DE R" },
    { value: 112, label: "6191-ZOLI MANUFACTURAS DEL TROPICO" },
    { value: 113, label: "6194-ZOLI EXPORT. DE CALIDAD DE HOND." },
    { value: 114, label: "6196-ZOLI INVERSIONES AMALGAMADAS" },
    { value: 115, label: "6197-ZOLI MOUNT DORA FARMS HONDURAS" },
    { value: 116, label: "6200-ZOLI MARINOS PESCADERIA, SRL" },
    { value: 117, label: "6201-ZOLI HANIL HONDURAS, S.A. DE C.V." },
    { value: 118, label: "6205-ZOLI PARQUES E INVER. INDUSTRIALES" },
    { value: 119, label: "6208-ZOLI HARNES CONT. EQUIPMENT HOND." },
    { value: 120, label: "6209-ZOLI FORMAS TERMICAS, S.A. DE C.V." },
    { value: 121, label: "6210-ENERGIA Y VAPOR S.A. DE C.V." },
    { value: 122, label: "6211-ZOLI ACEITES Y DERIVADOS, S.A." },
    { value: 123, label: "6212-ZOLI CORUMO INTERNACIONAL, SRL" },
    { value: 124, label: "6215-ZOLI AGROINDUSTRIAL PALMA REAL" },
    { value: 125, label: "6216-ZOLI AGRICOLA INDUSTRIAL CEIBEÑA S." },
    { value: 126, label: "6218-ZOLI ALTIA BUSINESS PARK" },
    { value: 127, label: "6219-ZOLI  VOGUE CORPORATION INTERNATIO." },
    { value: 128, label: "6220-ZOLI  SCANDINAVIAN TOBACCO GROUP" },
    { value: 129, label: "6221-ZOLI RECICLAJE DIAMANTE" },
    { value: 130, label: "6222-ZOLI MANUCHAR HONDURAS" },
    { value: 131, label: "6223-S & P RECICLYNG HONDURAS S.A. DE" },
    { value: 132, label: "6225-PALMAS CENTROAMERICANAS (PALCASA)" },
    { value: 133, label: "6226-HENDRIX AND DAIL DE HONDURAS SA" },
    { value: 134, label: "6227-RM SEWING SUPPLY, S. DE R. L." },
    { value: 135, label: "6228-ZONA LIBRE ST ANDRREWS S.A. DE C.V." },
    { value: 136, label: "6229-METALES Y ALEACIONES S A DE C V" },
    { value: 137, label: "6230-CHEMICAL MANUFACTURING AND EXPORTIN" },
    { value: 138, label: "6231-ZOLI ALMACEN FISCAL P SA DE CV" },
    { value: 139, label: "6232-ZONA LIBRE LAS AMERICAS SA DE CV" },
    { value: 140, label: "6233-NOVA HONDURAS ZONA LIBRE SA" },
    { value: 141, label: "6234-NEW HOLLAND LINGERIE DE HONDURAS" },
    { value: 142, label: "6235-CENTRAL AMERICAN TRAILER REPAIR SRL" },
    { value: 143, label: "6236-HONDURAS CONTAINER SERVICE SA DE CV" },
    { value: 144, label: "6237-ELASTICOS CENTROAMERICANOS Y TEXTIL" },
    { value: 145, label: "6238-ELASTICOS CENTROAMERICANOS SA DE CV" },
    { value: 146, label: "6239-GENESIS APPAREL" },
    { value: 147, label: "6240-HILOS A&E DE HONDURAS" },
    { value: 148, label: "6241-INVERSIONES LAS FLORES" },
    { value: 149, label: "6242-RIO NANCE AGRO-INDUSTRIAL SA DE CV" },
    { value: 150, label: "6244-INDUSTRIA HONDUREÑA DE MECHAS SA CV" },
    { value: 151, label: "6245-ARTESANOS SA DE CV" },
    { value: 152, label: "6246-FIBRAS Y TEXTILES SA DE CV" },
    { value: 153, label: "6247-YKK HONDURAS SA" },
    { value: 154, label: "6248-EUROMODAS SA" },
    { value: 155, label: "6249-CAOBA D EHONDURAS SA D ECV" },
    { value: 156, label: "6251-WINTEX DE HONDURAS SA DE CV" },
    { value: 157, label: "6253-INDUSTRIAS CONTINENTAL S DE RL" },
    { value: 158, label: "6254-TECNO SUPPLIER SA DE CV" },
    { value: 159, label: "6255-INVERSIONES LA VICTORIA" },
    { value: 160, label: "6256-COFRADIA INDUSTRIAL PARK SA" },
    { value: 161, label: "6257-CIRSA HONDURAS S DE RL DE CV" },
    { value: 162, label: "6258-RECYCLERS GROUP OF HONDURAS S DE R" },
    { value: 163, label: "6259-GRUPO INDUSTRIAL RIO BLANQUITO SA" },
    { value: 164, label: "6260-ELECTROQUIMICA DE HONDURAS SA" },
    { value: 165, label: "6261-MAQUILA Y CONFECCIONES AXIID INTERN" },
    { value: 166, label: "6262-SJ MARIOL SA DE CV" },
    { value: 167, label: "6263-PALMA DEL BAJO AGUAN SA" },
    { value: 168, label: "6264-ETHAN ALLEN SA" },
    { value: 169, label: "6265-RECICLAJE Y METALES DE CORTES S RL" },
    { value: 170, label: "6267-TABACOS DEL ORIENTE S DE RL" },
    { value: 171, label: "6269-AQUAFEED SA DE CV" },
    { value: 172, label: "6270-HILOS Y MECHAS SA DE CV" },
    { value: 173, label: "6271-C Y D S.A. DE C.V." },
    { value: 174, label: "6272-AGROINDUSTRIAL DEL VALLE S A" },
    { value: 175, label: "6273-FARM FRESH SA - LA PAZ" },
    { value: 176, label: "6274-FARM FRESH SA - COMAYAGUA" },
    { value: 177, label: "6275-PESCA DEL ATLANTICO S DE RL" },
    { value: 178, label: "6276-ADMINISTRACION DE CALL CENTERS, S.A" },
    { value: 179, label: "6277-INVERSIONES EMCO SA DE CV" },
    { value: 180, label: "6278-AGROECOLOGICA INTERNACIONAL S DE RL" },
    { value: 181, label: "6279-CHOCOLATE DEL CARIBE S.A." },
    { value: 182, label: "6280-CONVERTIDORA DE FIBRAS SA DE CV" },
    { value: 183, label: "6281-SOLUCIONES QUIMICAS INDUSTRIALES SA" },
    { value: 184, label: "6282-PRODUCTOS FRESCOS DEL MAR SN CARLOS" },
    { value: 185, label: "6283-EXTRUM SA DE CV" },
    { value: 186, label: "6284-DICKIES DE HONDURAS SA" },
    { value: 187, label: "6285-ALUCOM INTERNATIONAL S A DE C V" },
    { value: 188, label: "6286-PALMEROS DEL AGUAN SA (PALMASA)" },
    { value: 189, label: "6287-NUTRIAVES SA DE CV" },
    { value: 190, label: "6288-RECYCLERS GROUP OF HONDURAS S DE R" },
    { value: 191, label: "6289-REPLAST DE HONDURAS S DE RL" },
    { value: 192, label: "6290-PROCESA SA DE CV" },
    { value: 193, label: "6291-GRUPO RODRIGUEZ" },
    { value: 194, label: "6292-ZONA LIBRE LAS AMERICAS SA DE CV" },
    { value: 195, label: "6293-HILOTEX, S.A. DE C.V." },
    { value: 196, label: "6294-MOLINOS DE HONDURAS, SA" },
    { value: 197, label: "6295-BESCO S DE R L" },
    { value: 198, label: "6296-INDUSTRIAS CARNEAS DEL SUR SA" },
    { value: 199, label: "6297-ZOLI JAMEE EXPORT, S.A." },
    { value: 200, label: "6298-FORESTAL LATINOAMERICANA SA DE CV" },
    { value: 201, label: "6299-ZOLI EXPORTADORA  SAMOA" },
    { value: 202, label: "6300-ARNESES Y ENSAMBLES S DE RL" },
    { value: 203, label: "6301-O. R. S. DE HONDURAS S. DE R. L." },
    { value: 204, label: "6302-EXPORTADORA ECO INDUSTRIAL SA DE C" },
    { value: 205, label: "6303-COMPAÑIA INTERNACIONAL DE CONFECCIO" },
    { value: 206, label: "6304-LOS ROBLES SA DE CV" },
    { value: 207, label: "6305-INDUSTRIAS CONTINENTAL S DE RL" },
    { value: 208, label: "6306-SISTEMAS DE ENERGIA DE HONDURAS SA" },
    { value: 209, label: "6307-FLAMES INTERNATIONAL S DE RL" },
    { value: 210, label: "6308-PALMAS INTERNATIONAL SA DE CV" },
    { value: 211, label: "6309-PARQUE INDUSTRIAL DE CHOLIMA SA" },
    { value: 212, label: "6310-SANITARIOS CAIRO SA" },
    { value: 213, label: "6311-SADELCA DE HONDURAS S DE RL" },
    { value: 214, label: "6312-YKK HONDURAS SA DE CV" },
    { value: 215, label: "6313-EUROMODAS SA" },
    { value: 216, label: "6314-CAOBA DE HONDURAS SA DE CV" },
    { value: 217, label: "6315-CORPORACION CARTONERA & IMPRESOS 3J" },
    { value: 218, label: "6316-BIOCOMBUSTIBLES Y SALUD S A DE C" },
    { value: 219, label: "6317-SAN JUAN INNOVATION PARK SA DE CV" },
    { value: 220, label: "6318-PRIDE PERFORMANCE FABRICS, S.A. DE" },
    { value: 221, label: "6320-CIA AGRICOLA IND CEIBEÑA S A DE CV" },
    { value: 222, label: "6321-ALMACENADORA DE MATERIALES A GRANEL" },
    { value: 223, label: "6322-GUAYACAN FARMS S A DE C V" },
    { value: 224, label: "6323-PROGRESSIVE ENERGY CORPORATION SA D" },
    { value: 225, label: "6324-Q-APPAREL, SOCIEDAD ANONIMA" },
    { value: 226, label: "6325-BIOLARVA AQUACULTURE SA" },
    { value: 227, label: "6326-BIOLARVA AQUACULTURE SA" },
    { value: 228, label: "6327-INVERSIONES MI PULPE S DE R L" },
    { value: 229, label: "6328-LEVANTER SA DE CV" },
    { value: 230, label: "6329-ALMACENADORA DE MATERIALES A GRANEL" },
    { value: 231, label: "6330-REMA S.A." },
    { value: 232, label: "6331-FABRICA HONDUREÑA DE RECICLAJE S" },
    { value: 233, label: "6332-GRAN COSTA HONDURAS S DE R L" },
    { value: 234, label: "6333-BENEFICIO DE CAFE INLOHER S DE RL" },
    { value: 235, label: "6334-CARIBBEAN APPETIZERS SA DE CV" },
    { value: 236, label: "6335-SAN SERVICES S DE RL DE CV" },
    { value: 237, label: "6336-CYGNUS PACIFIC S A DE C V" },
    { value: 238, label: "6337-TABLEROS DE HONDURAS SA DE CV" },
    { value: 239, label: "6338-LEVANTER SA DE CV" },
    { value: 240, label: "6339-BIJAO ELECTRIC COMPANY SA DE C.V" },
    { value: 241, label: "6340-INHDELVA SPS S.A. DE C.V." },
    { value: 242, label: "6341-GILDAN HONDURAS PROPERTIES S DE R L" },
    { value: 243, label: "6342-INGENIERIA OPERACION PLANTAS TRATAM" },
    { value: 244, label: "6343-INVERSIONES ECOTEK SOCIEDAD ANONIMA" },
    { value: 245, label: "6344-EXPORTADORA E IMPORTADORA LA SIRENA" },
    { value: 246, label: "6345-CORAL BAY SA DE CV" },
    { value: 247, label: "6346-COFFEE PLANET CORPORATION SA DE CV" },
    { value: 248, label: "6347-ZONA LIBRE PRIDE, S.A. DE C.V," },
    { value: 249, label: "6348-CAFETALEROS DE HONDURAS S DE RL CV" },
    { value: 250, label: "6349-PARTNER HERO CENTRAL AMERICA SRL CV" },
    { value: 251, label: "6350-CORPORACION ANDIFAR, S. A. DE C. V." },
    { value: 252, label: "6351-CORUMO INTERNACIONAL S DE RL DE CV" },
    { value: 253, label: "6352-AVANZA LOGISTICS SA DE CV" },
    { value: 254, label: "6353-CORPORACION ATAMAR, S.A." },
    { value: 255, label: "6354-LABORATORIOS KARNEL, S.A" },
    { value: 256, label: "6355-CALZADOS DE HONDURAS S A" },
    { value: 257, label: "6356-TELEPERFORMANCE, SOCIEDAD ANONIMA" },
    { value: 258, label: "6357-PROCESADORA DEL CARIBE S.A DE C.V." },
    { value: 259, label: "6358-SAN JUAN INNOVATION PARK SA DE CV" },
    { value: 260, label: "6359-ALTIA BUSINESS PARK S.A. DE C.V." },
    { value: 261, label: "6360-ZABA INDUSTRIES, S. DE R. L. DE C." },
    { value: 262, label: "6361-TABACO MAYA S DE RL" },
    { value: 263, label: "6362-CRC BPO SOLUTIONS S. DE R.L." },
    { value: 264, label: "6363-GRUPO ALCA, S.A. DE C.V." },
    { value: 265, label: "6364-UNION DE FINCAS CAMARONERAS SOCIEDAD ANONIMA DE CA" },
    { value: 266, label: "6365-ALTIA BUSINESS PARK SA DE CV" },
    { value: 267, label: "6366-DEL MAR APPAREL S. A." },
    { value: 268, label: "6367-POWERS ATHLETIC DE HONDURAS SOCIEDAD ANONIMA DE CA" },
    { value: 269, label: "6368-PRIDE YARN, S. DE R.L" },
    { value: 270, label: "6369-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 271, label: "6370-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 272, label: "6371-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 273, label: "6372-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 274, label: "6373-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 275, label: "6374-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 276, label: "6375-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 277, label: "6376-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 278, label: "6377-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 279, label: "6378-EMPACADORA DE PRODUCTOS ACUATICOS SAN LORENZO S.A" },
    { value: 280, label: "6379-PLASTICOS INDUSTRIALES HONDUREÑOS SA DE CV" },
    { value: 281, label: "6380-EXPORTADORA AGRICOLA MESOAMERICANA, SOCIEDAD ANONI" },
    { value: 282, label: "6381-RESULTS HONDURAS, S.A." },
    { value: 283, label: "6382-ZONA LIBRE GREEN VALLEY INDUSTRIAL PARK SA DE CV" },
    { value: 284, label: "6383-SANTA LUCIA DEL PARAISO, S.A. DE C.V." },
    { value: 285, label: "6384-RIVERMAR LARVICULTURA S. DE R.L." },
    { value: 286, label: "6385-ACUARIUS, S DE R.L. DE C.V." },
    { value: 287, label: "6386-INDUSTRIA RESINERA BAHR, S. A." },
    { value: 288, label: "6387-SOUTHERN APPAREL CONTRACTORS S.A." },
    { value: 289, label: "6388-CORINFAR S A DE C V" },
    { value: 290, label: "6389-SOUTHERN APPAREL CONTRACTORS SA" },
    { value: 291, label: "6392-GLOBAL PRINTING SOLUTIONS DE HONDURAS SOCIEDAD ANO" },
    { value: 292, label: "9100-ZEDE MORAZAN" },
    { value: 293, label: "9101-ZEDE ORQUIDEA" },
    { value: 294, label: "9102-ZEDE PROSPERA" },
  ];

  const paises = [
    { value: 1, label: "AD-ANDORRA" },
    { value: 2, label: "AE-EMIRATOS ARABES UNIDOS" },
    { value: 3, label: "AF-AFGANISTAN" },
    { value: 4, label: "AG-ANTIGUA Y BARBUDA" },
    { value: 5, label: "AI-ANGUILLA" },
    { value: 6, label: "AL-ALBANIA" },
    { value: 7, label: "AM-ARMENIA" },
    { value: 8, label: "AN-ANTILLAS HOLANDESAS" },
    { value: 9, label: "AO-ANGOLA" },
    { value: 10, label: "AQ-ANTARTIDA" },
    { value: 11, label: "AR-ARGENTINA" },
    { value: 12, label: "AS-SAMOA AMERICANA" },
    { value: 13, label: "AT-AUSTRIA" },
    { value: 14, label: "AU-AUSTRALIA" },
    { value: 15, label: "AW-ARUBA" },
    { value: 16, label: "AX-ALAND, ISLAS" },
    { value: 17, label: "AZ-AZERBALIAN" },
    { value: 18, label: "BA-BOSNIA Y HERZSEGOVINA" },
    { value: 19, label: "BB-BARBADOS" },
    { value: 20, label: "BD-BANGLADESH" },
    { value: 21, label: "BE-BELGICA" },
    { value: 22, label: "BF-BURKINA FASO" },
    { value: 23, label: "BG-BULGARIA" },
    { value: 24, label: "BH-BAHREIN" },
    { value: 25, label: "BI-BURUNDI" },
    { value: 26, label: "BJ-BENIN" },
    { value: 27, label: "BL-SAINT BARTHELEMY" },
    { value: 28, label: "BM-BERMUDA" },
    { value: 29, label: "BN-BRUNEI DARUSSALAM" },
    { value: 30, label: "BO-BOLIVIA" },
    { value: 31, label: "BQ-BONAIRE, SINT EUSTATIUS AND SABA" },
    { value: 32, label: "BR-BRASIL" },
    { value: 33, label: "BS-BAHAMAS" },
    { value: 34, label: "BT-BUTAN" },
    { value: 35, label: "BV-BOUVET, ISLA" },
    { value: 36, label: "BW-BOTSWANA" },
    { value: 37, label: "BY-BIELORRUSIA" },
    { value: 38, label: "BZ-BELICE" },
    { value: 39, label: "CA-CANADA" },
    { value: 40, label: "CC-COCOS (KEELING) ISLAS" },
    { value: 41, label: "CD-CONGO, REPUBLICA DEMOCRATICA" },
    { value: 42, label: "CF-CENTROAFRICANA, REPUBLICA" },
    { value: 43, label: "CG-CONGO, REP. POPULAR DEL" },
    { value: 44, label: "CH-SUIZA" },
    { value: 45, label: "CI-COSTA DE MARFIL (COTE D'IVOIRE)" },
    { value: 46, label: "CK-COOK ISLAS" },
    { value: 47, label: "CL-CHILE" },
    { value: 48, label: "CM-CAMERUN" },
    { value: 49, label: "CN-CHINA" },
    { value: 50, label: "CO-COLOMBIA" },
    { value: 51, label: "CR-COSTA RICA" },
    { value: 52, label: "CU-CUBA" },
    { value: 53, label: "CV-CABO VERDE" },
    { value: 54, label: "CW-CURAZAO" },
    { value: 55, label: "CX-NAVIDAD, ISLAS" },
    { value: 56, label: "CY-CHIPRE" },
    { value: 57, label: "CZ-CHECA, REPUBLICA" },
    { value: 58, label: "DE-ALEMANIA, REPUBLICA FEDERAL" },
    { value: 59, label: "DJ-DJIBOUTH" },
    { value: 60, label: "DK-DINAMARCA" },
    { value: 61, label: "DM-DOMINICA" },
    { value: 62, label: "DO-DOMINICANA, REPUBLICA" },
    { value: 63, label: "DZ-ARGELIA" },
    { value: 64, label: "EC-ECUADOR" },
    { value: 65, label: "EE-ESTONIA" },
    { value: 66, label: "EG-EGIPTO" },
    { value: 67, label: "EH-SAHARA DEL OESTE" },
    { value: 68, label: "ER-ERITREA" },
    { value: 69, label: "ES-ESPAÑA" },
    { value: 70, label: "ET-ETIOPIA" },
    { value: 71, label: "FI-FINLANDIA" },
    { value: 72, label: "FJ-FIJI" },
    { value: 73, label: "FK-FALKLAND ISLAS (MALVINAS)" },
    { value: 74, label: "FM-MICRONESIA,ESTADO FEDERAL DE" },
    { value: 75, label: "FO-FAROE, ISLAS" },
    { value: 76, label: "FR-FRANCIA" },
    { value: 77, label: "GA-GABON" },
    { value: 78, label: "GB-REINO UNIDO (INGLATERRA, IRLANDA NORTE, ESCOCIA, GALES)" },
    { value: 79, label: "GD-GRENADA" },
    { value: 80, label: "GE-GEORGIA" },
    { value: 81, label: "GF-FRANCESA, GUINEA" },
    { value: 82, label: "GH-GHANA" },
    { value: 83, label: "GI-GIBRALTAR" },
    { value: 84, label: "GL-GROENLANDIA" },
    { value: 85, label: "GM-GAMBIA" },
    { value: 86, label: "GN-GUINEA" },
    { value: 87, label: "GP-GUADALUPE" },
    { value: 88, label: "GQ-ECUATORIAL, GUINEA" },
    { value: 89, label: "GR-GRECIA" },
    { value: 90, label: "GS-GEORGIA DEL SUR E ISLAS SAND" },
    { value: 91, label: "GT-GUATEMALA" },
    { value: 92, label: "GU-GUAN" },
    { value: 93, label: "GW-GUINEA-BISSAU" },
    { value: 94, label: "GY-GUYANA (ANTIGUA GUYANA INGLESA" },
    { value: 95, label: "HK-HONG KONG" },
    { value: 96, label: "HM-HEARD Y MC DONALD ISLAS" },
    { value: 97, label: "HN-HONDURAS" },
    { value: 98, label: "HR-CROACIA" },
    { value: 99, label: "HT-HAITI" },
    { value: 100, label: "HU-HUNGRIA" },
    { value: 101, label: "ID-INDONESIA" },
    { value: 102, label: "IE-IRLANDA" },
    { value: 103, label: "IL-ISRAEL" },
    { value: 104, label: "IN-INDIA" },
    { value: 105, label: "IO-TERRITORIO BRITANICO DEL OCEANO INDICO" },
    { value: 106, label: "IQ-IRAQ" },
    { value: 107, label: "IR-IRAN, REPUBLICA ISLAMICA" },
    { value: 108, label: "IS-ISLANDIA" },
    { value: 109, label: "IT-ITALIA" },
    { value: 110, label: "JM-JAMAICA" },
    { value: 111, label: "JO-JORDANIA" },
    { value: 112, label: "JP-JAPON" },
    { value: 113, label: "KE-KENIA" },
    { value: 114, label: "KG-KIRGHIZISTAN" },
    { value: 115, label: "KH-CAMBOYA" },
    { value: 116, label: "KI-KIRIBATI" },
    { value: 117, label: "KM-COMORES" },
    { value: 118, label: "KN-SAINT KITTS AND NEVIS" },
    { value: 119, label: "KP-KOREA, REP. POPULAR DEMOCRATICA" },
    { value: 120, label: "KR-KOREA, REP. DE (KOREA DEL SUR)" },
    { value: 121, label: "KW-KUWAIT" },
    { value: 122, label: "KY-CAIMAN ISLAS" },
    { value: 123, label: "KZ-KAZAKSTAN" },
    { value: 124, label: "LA-LAOS, REPUBLICA POPULAR DEMOCRATICA" },
    { value: 125, label: "LB-LIBANO" },
    { value: 126, label: "LC-SANTA LUCIA" },
    { value: 127, label: "LI-LIECHTENSTEIN" },
    { value: 128, label: "LK-SRI LANKA (CEILAN)" },
    { value: 129, label: "LR-LIBERIA" },
    { value: 130, label: "LS-LESOTHO" },
    { value: 131, label: "LT-LITUANIA" },
    { value: 132, label: "LU-LUXEMBURGO" },
    { value: 133, label: "LV-LETONIA" },
    { value: 134, label: "LY-LIBIA ARABE JAMAHIRIYA" },
    { value: 135, label: "MA-MARRUECOS" },
    { value: 136, label: "MC-MONACO" },
    { value: 137, label: "MD-MOLDAVIA, REPUBLICA DE" },
    { value: 138, label: "ME-MONTENEGRO" },
    { value: 139, label: "MF-SAINT MARTIN (FRENCH PART)" },
    { value: 140, label: "MG-MADAGASCAR" },
    { value: 141, label: "MH-MARSHALL, ISLAS" },
    { value: 142, label: "MK-MACEDONIA, LA ANT.REP.DE YUGOS" },
    { value: 143, label: "ML-MALI" },
    { value: 144, label: "MM-MYANMAR (ANTIGUA REP. DE BIRMANIA)" },
    { value: 145, label: "MN-MONGOLIA" },
    { value: 146, label: "MO-MACAU" },
    { value: 147, label: "MP-MARIANAS SEPTENTRIONALES, ISLAS" },
    { value: 148, label: "MQ-MARTINICA" },
    { value: 149, label: "MR-MAURITANIA" },
    { value: 150, label: "MS-MONTSERRAT" },
    { value: 151, label: "MT-MALTA" },
    { value: 152, label: "MU-MAURICIOS" },
    { value: 153, label: "MV-MALDIVAS" },
    { value: 154, label: "MW-MALAWI" },
    { value: 155, label: "MX-MEXICO" },
    { value: 156, label: "MY-MALASIA" },
    { value: 157, label: "MZ-MOZAMBIQUE" },
    { value: 158, label: "NA-NAMIBIA" },
    { value: 159, label: "NC-NUEVA CALEDONIA" },
    { value: 160, label: "NE-NIGER" },
    { value: 161, label: "NF-NORFOLK, ISLAS" },
    { value: 162, label: "NG-NIGERIA" },
    { value: 163, label: "NI-NICARAGUA" },
    { value: 164, label: "NL-PAISES BAJOS" },
    { value: 165, label: "NO-NORUEGA" },
    { value: 166, label: "NP-NEPAL" },
    { value: 167, label: "NR-NAURO" },
    { value: 168, label: "NU-NIUE" },
    { value: 169, label: "NZ-NUEVA ZELANDA" },
    { value: 170, label: "OM-OMAN" },
    { value: 171, label: "PA-PANAMA" },
    { value: 172, label: "PE-PERU" },
    { value: 173, label: "PF-FRANCESA POLINESIA" },
    { value: 174, label: "PG-PAPUA NUEVA GUINEA" },
    { value: 175, label: "PH-FILIPINAS" },
    { value: 176, label: "PK-PAKISTAN" },
    { value: 177, label: "PL-POLONIA" },
    { value: 178, label: "PM-SAN PEDRO Y MIGUELON" },
    { value: 179, label: "PN-PITCAIRN" },
    { value: 180, label: "PR-PUERTO RICO" },
    { value: 181, label: "PS-TERRITORIO PALESTINO OCUPADO" },
    { value: 182, label: "PT-PORTUGAL" },
    { value: 183, label: "PW-PALAU" },
    { value: 184, label: "PY-PARAGUAY" },
    { value: 185, label: "QA-QATAR" },
    { value: 186, label: "RE-REUNION" },
    { value: 187, label: "RO-RUMANIA" },
    { value: 188, label: "RS-SERBIA" },
    { value: 189, label: "RU-RUSA, FEDERACION" },
    { value: 190, label: "RW-RUANDA" },
    { value: 191, label: "SA-SAUDITA ARABIA" },
    { value: 192, label: "SB-SOLOMON, ISLAS" },
    { value: 193, label: "SC-SEYCHELLES, ISLAS" },
    { value: 194, label: "SD-SUDAN" },
    { value: 195, label: "SE-SUECIA" },
    { value: 196, label: "SG-SINGAPUR" },
    { value: 197, label: "SH-SANTA HELENA" },
    { value: 198, label: "SI-ESLOVENIA" },
    { value: 199, label: "SJ-SVALBARD AND JAN MAYEN ISLAS" },
    { value: 200, label: "SK-ESLOVAKIA" },
    { value: 201, label: "SL-SIERRA LEONA" },
    { value: 202, label: "SM-SAN MARINO" },
    { value: 203, label: "SN-SENEGAL" },
    { value: 204, label: "SO-SOMALIA" },
    { value: 205, label: "SR-SURINAM (GUAYANA HOLANDESAS)" },
    { value: 206, label: "SS-SUDAN DEL SUR" },
    { value: 207, label: "ST-SAO TOME Y PRINCIPE" },
    { value: 208, label: "SV-EL SALVADOR" },
    { value: 209, label: "SX-SINT MAARTEN (DUTCH PART)" },
    { value: 210, label: "SY-SIRIA, REPUBLICA ARABE" },
    { value: 211, label: "SZ-SUAZILANDIA" },
    { value: 212, label: "TC-TURCOS Y CAICOS ISLAS" },
    { value: 213, label: "TD-CHAD" },
    { value: 214, label: "TF-FRANCESES, TERRITORIOS DEL SURESTE" },
    { value: 215, label: "TG-TOGO" },
    { value: 216, label: "TH-TAILANDIA" },
    { value: 217, label: "TJ-TADJIKISTAN" },
    { value: 218, label: "TK-TOKELAU" },
    { value: 219, label: "TL-TIMOR DEL ESTE" },
    { value: 220, label: "TM-TURKMENISTAN" },
    { value: 221, label: "TN-TUNISIA" },
    { value: 222, label: "TO-TONGA" },
    { value: 223, label: "TR-TURQUIA" },
    { value: 224, label: "TT-TRINIDAD Y TOBAGO" },
    { value: 225, label: "TV-TUVALU" },
    { value: 226, label: "TW-TAIWAN, PROVINCIA CHINA DE" },
    { value: 227, label: "TZ-TANZANIA, REPUBLICA UNIDA DE" },
    { value: 228, label: "UA-UCRANIA" },
    { value: 229, label: "UG-UGANDA" },
    { value: 230, label: "UM-ISLAS ULTRAMARINAS MENORES (EEUU)" },
    { value: 231, label: "US-ESTADOS UNIDOS" },
    { value: 232, label: "UY-URUGUAY" },
    { value: 233, label: "UZ-UZBEKISTAN" },
    { value: 234, label: "VA-SANTA SEDE (CIUDAD DEL VATICANO)" },
    { value: 235, label: "VC-SAN VICENTE Y LAS GRANADINAS" },
    { value: 236, label: "VE-VENEZUELA" },
    { value: 237, label: "VG-VIRGENES, ISLAS (BRITANICAS)" },
    { value: 238, label: "VI-VIRGENES, ISLAS (ESTADOS UNIDOS)" },
    { value: 239, label: "VN-VIETNAM" },
    { value: 240, label: "VU-VANUATU" },
    { value: 241, label: "WF-WALLIS Y FUTUNA, ISLAS" },
    { value: 242, label: "WS-SAMOA" },
    { value: 243, label: "YE-YEMEN" },
    { value: 244, label: "YT-MAYOTTE" },
    { value: 245, label: "ZA-SURAFRICA" },
    { value: 246, label: "ZM-ZAMBIA" },
    { value: 247, label: "ZW-ZIMBABWE" },
  ];

  const nose = [
    { value: 1, label: "No sé que es" }
  ]

  const marcas = [
    { value: 1, label: "Toyota" },
    { value: 2, label: "Honda" },
    { value: 3, label: "Lancia" },
    { value: 4, label: "Volvo" },
    { value: 5, label: "Nissan" },
    { value: 6, label: "Lamborghini" },
    { value: 7, label: "Ferrari" },
    { value: 8, label: "Mercedes" },
    { value: 9, label: "Audi" },
    { value: 10, label: "Porsche" },
    { value: 11, label: "Tesla" },
    { value: 12, label: "Ford" },
    { value: 13, label: "Mazda" },
    { value: 14, label: "Kia" },
    { value: 15, label: "Isuzu" },
    { value: 16, label: "Mobile" },
    { value: 17, label: "Pagani" },
    { value: 18, label: "Kognisegg" },
    { value: 19, label: "Dodge" },
    { value: 20, label: "Hyundai" },
    { value: 21, label: "Jaguar" },
  ]

  const modostransporte = [
    { value: 1, label: "Terrestre" },
    { value: 2, label: "Aereo" },
    { value: 3, label: "Maritimo" },
  ]

  const tiposCarga = [
    { value: 1, label: "Ligera" },
    { value: 2, label: "Mediana" },
    { value: 3, label: "Pesada" },
    { value: 3, label: "MuyPesada" },
  ]

  const [valueR, setValueR] = useState(1);
  const onChangeR = (e) => {
    console.log('radio checked', e.target.value);
    setValueR(e.target.value);
  };

  const options = [
    { label: 'Carnita', id: 1 },
    { label: 'Huevitos', id: 2 },
    { label: 'Un pleiestation', id: 3 },
  ];

  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState({});
  const [FechaVencimiento, setFechaVencimiento] = useState(null)

  const handleDateChange = date => {
    setFechaVencimiento(date);
  };

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (id) => {
    console.log(id);
    // Lógica para manejar la edición de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDetails = (id) => {
    // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(id);
  };

  const [filas, setFilas] = React.useState(10);

  const table = [
    { label: 'Honduras', id: 1 },
    { label: 'Mexico', id: 2 },
    { label: 'China', id: 3 },
  ];

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Item',
      dataIndex: 'Item',
      key: 'Item',
      sorter: (a, b) => a.Item.localeCompare(b.Item),
    },
    {
      title: 'Cantidad bultos',
      dataIndex: 'bultos',
      key: 'bultos',
      sorter: (a, b) => a.bultos.localeCompare(b.bultos),
    },
    {
      title: 'Peso Neto',
      dataIndex: 'Neto',
      key: 'Neto',
      sorter: (a, b) => a.Neto.localeCompare(b.Neto),
    },
    {
      title: 'Valor en Aduana',
      dataIndex: 'Valor',
      key: 'Valor',
      sorter: (a, b) => a.Valor.localeCompare(b.Valor),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  const columnsDocumentos = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Numero',
      dataIndex: 'Item',
      key: 'Item',
      sorter: (a, b) => a.Item.localeCompare(b.Item),
    },
    {
      title: 'Emision Documento',
      dataIndex: 'bultos',
      key: 'bultos',
      sorter: (a, b) => a.bultos.localeCompare(b.bultos),
    },
    {
      title: 'Pais de Emision',
      dataIndex: 'Neto',
      key: 'Neto',
      sorter: (a, b) => a.Neto.localeCompare(b.Neto),
    },
    {
      title: 'Fecha de vencimiento',
      dataIndex: 'Valor',
      key: 'Valor',
      sorter: (a, b) => a.Valor.localeCompare(b.Valor),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  {/* Datos de la tabla */ }
  const data = [
    { key: 1, id: 1, Item: 'Lamborghini Urus', bultos: '1', Neto: '2.272 kg', Valor: '5,857,290 MX' },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/6FZrCcv/DUCAS.png"
        alt="Encabezado de la carta"
      />
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ backgroundColor: "#FFF7F7", color: black }}
          >
            <Tab
              label="Identificación de la declaración. Exportador / Proveedor Importador / Destinatario"
              {...a11yProps(0)}
            />
            <Tab label="Declarante Transportista Conductor" {...a11yProps(1)} />
            <Tab
              label="Valores totales Mercancías Documentos de soporte"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <form onSubmit={handleSubmit((_data) => {
            if (isValid) {
              setValue(1)
            }
          })}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              
            <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                  <Chip color='default' label="Identificación de la Declaración" />
                </Divider>
              </Grid>
              <Grid container spacing={2}>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">No. Correlativo o Referencia</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errors.NoCorrelativoReferencia}
                        ></TextField>
                      )}
                      name="NoCorrelativoReferencia"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
             <FormControl fullWidth>
             <FormLabel id="group-label">Aduana Registro/Ingreso</FormLabel>
             <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={aduanas}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} error={!!errors.AduanaRegistro} InputLabelProps={{ shrink: true }} />}
                    />
                  )}
                    name="AduanaRegistro"
                    control={control}
                  />
             </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Aduana de Destino</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={aduanas}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.AduanaDestino} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="AduanaDestino"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Regimen Aduanero</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={regimenAduenaro}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.RegimenAduanero} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="RegimenAduanero"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Modalidad</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={nose}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.Modalidad} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="Modalidad"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Clase</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={nose}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.Clase} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="Clase"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                <FormControl fullWidth>
                <FormLabel id="group-label">Fecha de Vencimiento</FormLabel>
                <Controller
                    name="FechaVencimiento"
                    control={control}
                    value={FechaVencimiento}
                    render={({ field }) => (
                      <DatePicker
                        InputLabelProps={{ shrink: true }}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            className="w-full"
                            error={!!errors.FechaVencimiento}
                          />}
                        {...field}
                      />
                    )}
                  />
                </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Pais de Procedencia</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={paises}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.PaisProcedencia} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="PaisProcedencia"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">País de Destino</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={paises}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors.PaisDestino} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="PaisDestino"
                      control={control}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Depósito Aduanero / Zona Franca</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          placeholder=""
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          error={!!errors.DepositoAduanero}
                        ></TextField>
                      )}
                      name="DepositoAduanero"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Lugar de Desembarque</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          placeholder=""
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          error={!!errors.LugarDesembarque}
                        ></TextField>
                      )}
                      name="LugarDesembarque"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Manifiesto</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          placeholder=""
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          error={!!errors.Manifiesto}
                        ></TextField>
                      )}
                      name="Manifiesto"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>

              </Grid>

              <Grid
                item
                xs={12}
                marginTop={'10px'}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!isValid) {
                      Toast.fire({
                        icon: "error",
                        title: "Hay campos vacios",
                      });
                    }
                  }}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  type="submit"
                >
                  Guardar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px" }}
                  sx={{
                    backgroundColor: "#DAD8D8",
                    color: "black",
                    "&:hover": { backgroundColor: "#BFBABA" },
                  }}
                  onClick={(e) => {
                    navigate("/Duca/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </TabPanel>
          </form>

          <form onSubmit={handlesubmit1((_data) => {
            if (isValid1 == true) {
              setValue(2)
            }
          })}>
            <TabPanel value={value} index={1} dir={theme.direction}>

            <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                  <Chip color='default' label="Transportista" />
                </Divider>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Codigo</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          placeholder=""
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                          error={!!errors1.Codigo}
                        ></TextField>
                      )}
                      name="Codigo"
                      control={control1}
                    ></Controller>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.Nombre}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="Nombre"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Modo de Transporte</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={modostransporte}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors1.ModoTransporte} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="ModoTransporte"
                      control={control1}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Chip color='default' label="Conductor" />
                </Divider>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">No. Identificación</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.NoIdentificador}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="NoIdentificador"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">No. Licencia de Conducir</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.NoLicenciaConducir}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="NoLicenciaConducir"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Pais Expedicion</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={paises}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors1.PaisExpedicion} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="PaisExpedicion"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Nombres y Apellidos</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.NombresApellidos}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="NombresApellidos"
                      control={control1} />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Id Unidad Transporte</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.IdUnidadTransporte}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="IdUnidadTransporte"
                      control={control1} />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Pais de Registro</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={paises}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors1.PaisRegistro} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="PaisRegistro"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Marca</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={marcas}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors1.Marca} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="Marca"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Chasis/Vin</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.ChasisVin}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="ChasisVin"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Identificación del Remolque o Semirremolque</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.IdentificacionRemolque}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      ></TextField>
                    )}
                      name="IdentificacionRemolque"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Cantidad de Unidades Carga (remolque y semirremolque)</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.CantidadUnidadesCarga}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="CantidadUnidadesCarga"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Número de Dispositivo Seguridad</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.NumeroDispositivo}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="NumeroDispositivo"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Equipamiento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.Equipamiento}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="Equipamiento"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Tamaño del Equipamiento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.TamañoEquipamiento}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="TamañoEquipamiento"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Tipo de Carga</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={tiposCarga}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors1.TipoCarga} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="TipoCarga"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Número de Identificación de Contenedores</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors1.NIdentificacionContenedor}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )}
                      name="NIdentificacionContenedor"
                      control={control1}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                >
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (!isValid1) {
                        Toast.fire({
                          icon: "error",
                          title: "Hay campos vacios",
                        });
                      }
                    }}
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    type="submit"
                  >
                    Guardar
                  </Button>

                  <Button
                    startIcon={<Icon>close</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px" }}
                    sx={{
                      backgroundColor: "#DAD8D8",
                      color: "black",
                      "&:hover": { backgroundColor: "#BFBABA" },
                    }}
                    onClick={(e) => {
                      navigate("/Duca/Index");
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </form>

          <form onSubmit={handlesubmit2((_data) => { })}>
            <TabPanel value={value} index={2} dir={theme.direction}>

              <FormControl fullWidth>

              </FormControl>

              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '20px' }}>
                  <Chip color='default' label="Mercancia" />
                </Divider>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Items</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        placeholder='Items'
                        renderInput={(params) => <TextField {...params} error={!!errors2.Items} InputLabelProps={{ shrink: true }} />}
                      />
                    )}
                      control={control2} name="Items" />
                  </FormControl>

                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Cantidad Bultos</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.CantidadBultos}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="CantidadBultos" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Clase de bulto</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={nose}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors2.ClaseBulto} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="ClaseBulto"
                      control={control2}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Peso Neto</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.PesoNeto}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="PesoNeto" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Peso Bruto</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.PesoBruto}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="PesoBruto" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Cuota contigente</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={nose}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors2.CuotaContingente} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="CuotaContingente"
                      control={control2}
                    />
                  </FormControl>

                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Acuerdo</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.Acuerdo}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="Acuerdo" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Criterio para Certificar Origen</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.CriterioParaOrigen}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="CriterioParaOrigen" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Reglas Accesorias</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        error={!!errors2.ReglasAccesorias}
                        defaultValue=""
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="ReglasAccesorias" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Valor de Transacción</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.ValorTransaccion}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="ValorTransaccion" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Gastos de Transporte</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.GastosTransporte}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="GastosTransporte" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Seguro</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.Seguro}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="Seguro" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <Controller render={({ field }) => (
                    <FormControl fullWidth>
                      <FormLabel id="group-label">Otros Gastos</FormLabel>
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.OtrosGastos}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    </FormControl>
                  )} name="OtrosGastos" control={control2} />
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Valor en aduana</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.ValorAduana}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="ValorAduana" control={control2} />
                  </FormControl>

                </Grid>
                {/* <Grid item xs={1}>

                </Grid> */}

                <Grid item xs={6} display={"flex"} justifyContent={"end"} alignContent={"end"}>
                  <Button
                    startIcon={<Icon>add</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    type="button"
                  >
                    Añadir Mercancía
                  </Button>
                </Grid>

                <Grid item xs={12}>

                  <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '0px' }}>

                    <Table
                      columns={columns}
                      dataSource={filteredRows}
                      size="small"
                      pagination={{
                        pageSize: filas,
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Chip color='default' label="Documentos de Soporte" />
                </Divider>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Codigo de Tipo Documento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        error={!!errors2.CodigoTipoDocumento}
                        defaultValue=""
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} control={control2} name="CodigoTipoDocumento" />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Numero de Documento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.NumeroDocumento}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="NumeroDocumento" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Emision Documento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.EmisionDocumento}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="EmisionDocumento" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Fecha de Vencimiento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.FechaVencimiento}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="FechaVencimiento" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Pais de Emision</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={paises}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} error={!!errors2.PaisEmision} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="PaisEmision"
                      control={control2}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Linea (al que aplica el documento)</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.Linea}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="Linea" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Autoridad que Emitio el documento</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.AutoridadEntidad}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="AutoridadEntidad" control={control2} />
                  </FormControl>

                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                  <FormLabel id="group-label">Monto</FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        defaultValue=""
                        error={!!errors2.Monto}
                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                      ></TextField>
                    )} name="Monto" control={control2} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"end"} alignContent={"center"}>
                  <Button
                    startIcon={<Icon>add</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    type="button"
                  >
                    Añadir Documento
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '0px' }}>

                    <Table
                      columns={columnsDocumentos}
                      dataSource={null}
                      size="small"
                      pagination={{
                        pageSize: filas,
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Typography variant="h6" color="#077" my={"15px"}>
                Observaciones
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <FormControl fullWidth>
                    <FormLabel>Observaciones </FormLabel>
                    <Controller render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        placeholder=""
                        error={!!errors2.Observaciones}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                      />
                    )} name="Observaciones" control={control2} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Clasificacion de color</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Rojo" />
                      <FormControlLabel value="male" control={<Radio />} label="Amarillo" />
                      <FormControlLabel value="other" control={<Radio />} label="Verde" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} my={'15px'}>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                >
                  <Button
                    startIcon={<Icon>checked</Icon>}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (!isValid2) {
                        Toast.fire({
                          icon: "error",
                          title: "Hay campos vacios",
                        });
                      } else {
                        navigate('/Duca/Index')
                      }
                    }}
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    type="submit"
                  >
                    Guardar
                  </Button>

                  <Button
                    startIcon={<Icon>close</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px" }}
                    sx={{
                      backgroundColor: "#DAD8D8",
                      color: "black",
                      "&:hover": { backgroundColor: "#BFBABA" },
                    }}
                    onClick={(e) => {
                      navigate("/Duca/Index");
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </form>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default DucaCrear;