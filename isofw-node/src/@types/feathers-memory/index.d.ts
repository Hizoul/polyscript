declare function memory(): any;
declare module memory {}
declare module "feathers-memory" {
    export = memory;
}