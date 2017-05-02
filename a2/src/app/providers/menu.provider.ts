import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {DialogProvider} from "../providers/dialog.provider";

/**
 * Chargée de créer les descripteurs de menus pour l'application
 */
@Injectable()
export class MenuProvider{

    menu:Subject<any> = new Subject<any>();
    constructor(private _dlg:DialogProvider){}

    getMenuObservable():Observable<any>{
        return this.menu.asObservable();
    }

    clearMenus(){
        this.menu.next(null);
    }
    pushTableContextMenu(target:any, coords){
        let desc = {
            target: target,
            coords:coords,
            menus:[
                {
                    label:"Show Properties",
                    icon:"settings",
                    action:"SHOW_PROPS"
                },
                {
                    label:"Add Field",
                    icon:"playlist_add",
                    action:"ADD_PROPS"
                },
                {
                    label:"Add Constraint",
                    icon:"report",
                    action:"ADD_CONSTRAINT"
                },
                {
                    label:"Delete Table",
                    icon:"delete",
                    action:"DELETE"
                }
            ]
        };

        this.menu.next(desc);
    }

    pushMainContextMenu(target,coords){
        let desc = {
            target: target,
            coords:coords,
            menus:[
                {
                    action:"new_table",
                    icon:"insert_drive_file",
                    label:"New TABLE"
                },
                {
                    action:"save_schema",
                    icon:"save",
                    label:"Save SCHEMA"
                },
                {
                    action:"export_sql",
                    icon:"file_upload",
                    label:"Export SQL"
                },
                {
                    action:"new_base",
                    icon:"folder",
                    label:"New BASE"
                },
                {
                    action:"about",
                    icon:"info",
                    label:"About SQLTool"
                }
            ]
        };

        this.menu.next(desc);
    }


    process_menu(action, target, coords){
        switch(action){
            case 'new_table':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAddTableDialog(coords);
                break;
            }
            case 'ADD_PROPS':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAddFieldDialog(target);
                break;
            }
            case 'SHOW_PROPS':{
                this._dlg.pushShowTableProperties(target);
                break;
            }
            case 'about':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAboutDialog();
                break;
            }
        }
    }
}