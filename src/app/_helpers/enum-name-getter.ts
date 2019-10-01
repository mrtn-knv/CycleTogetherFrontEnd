export class EnumNameGetter {
    constructor(){
        
    }

    public getNames(types: any): string[] {
        var options = Object.keys(types);
        return options.slice(options.length / 2);
      }
}
