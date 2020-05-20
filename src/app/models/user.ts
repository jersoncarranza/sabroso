export class User{
    constructor(
    public _id:      String,
    public nombres:    String,
    public apellidos:  String,
    public nickname:   String,
    public password:   String,
    public estadoCivil:String,
    public fechaNacimiento: String,
    public image:      String,
    public email:      String,
    public codigo:     String,
    public estado:     Number,// //0 Iabilitado ; 1 Habilitado
    public enabled:    Boolean, ////  // Tre: Activo: False Desactivado
    public sexo:       Number,     //  0Mujer(Woman); 1 Hombre (Man Male)
    public tipo:       Number,  // 7 cliente, 8 modelo
    public sexoPreferencia:Number,
    public independiente: Number,
    public tatto:         Number,
    public hijos:         Number,
    public descripcion:   String,
    public facebook:      String,
    public twitter:       String,
    public created:     String,
    public country:     String,
    public city:        String,
    public redSocial:   String,
    public whatsapp:    String
    ) {}
}
