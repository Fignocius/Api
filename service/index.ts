import * as fs from "fs";
import * as uuid from "uuid/v4";
import * as moment from "moment";

const file = "file/file.json";

export interface Interval {
	startAt: string;
	endAt: string;
}

export interface Rule {
    id?: string;
    type: "daily" | "weekly" | "single";
	day?: string;
	weekly?:  "1" | "2" | "3" | "4" | "5" | "6" | "0";
	intervals: Interval[];
}

// Cria nova regra de atendimento
export function create(body: Rule){
    return new Promise((resolve, reject) =>{
        readFile()
        .then((rules: Rule[]) =>{
            let newRule: Rule = {...body, id: uuid()};
            rules.push(newRule)
            fs.writeFile(file, JSON.stringify(rules), function(err) {
                if (!err) {
                    resolve(newRule);
                } else {
                    reject("Não foi possível escrever no arquivo" + err);
                }
            });
        })
        .catch((err)=>{
            reject("Erro ao ler o arquivo" + err);
        })
    })
}

// Lista todas as regras de atendimento
export function list(){
    return new Promise((resolve, reject) =>{
        readFile()
        .then((rules: Rule[]) =>{
            resolve(rules);
        })
        .catch((err)=>{
            reject("Erro ao ler o arquivo" + err);
        })
    })
}

// Deleta regra de atendimento referente ao id
export function del(id: string){
    return new Promise((resolve, reject) =>{
        readFile()
        .then((rules: Rule[]) =>{
            let newRules: Rule[] = [];
            rules.forEach(item =>{
                if(item.id !== id){
                    newRules.push(item);
                }
            })
            fs.writeFile(file, JSON.stringify(newRules), function(err) {
                if (!err) {
                    resolve(newRules);
                } else {
                    reject("Não foi possível escrever no arquivo" + err);
                }
            });
        })
        .catch((err)=>{
            reject("Erro ao ler o arquivo" + err);
        })
    })
}

// get todas as regras de atendimento pelo filtro
export function get(startAt: string, endAt: string){
    return new Promise((resolve, reject) =>{
        readFile()
        .then((rules: Rule[]) =>{
            let start = moment(startAt, "DD-MM-YYYY").format("YYYY-MM-DD");
            let end = moment(endAt, "DD-MM-YYYY").format("YYYY-MM-DD");
            console.log(start, end);
            let newRules: Array<any> = [];
            rules.forEach(item =>{
                switch(item.type){
                    case "single":
                        if( moment(moment(item.day, "DD-MM-YYYY")
                            .format("YYYY-MM-DD"))
                            .isBetween(start, end)){
                            newRules.push({day: item.day, intervals: item.intervals});
                        }
                        break;
                    case "daily":
                        let DayStart = moment(startAt).day().toString();
                        let DayEnd = moment(end).day().toString();
                        if(DayEnd != '0' && DayEnd != '6' && DayStart != '0' && DayStart != '6'){
                            newRules.push({day: item.day, intervals: item.intervals});
                        }
                        break;
                    case "weekly":
                        let weeksDayStart = moment(startAt).day().toString();
                        let weeksDayEnd = moment(endAt).day().toString();
                        if(item.weekly >= weeksDayStart && item.weekly <= weeksDayEnd){
                            newRules.push({day: item.day, intervals: item.intervals});
                        }
                        break;
                }
            })
            resolve(newRules);
        })
        .catch((err)=>{
            reject("Erro ao ler o arquivo" + err);
        })
    })
}

export function readFile() {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err: any, rules: any) => {
			if (!err) {
                var allRules = JSON.parse(rules);
                resolve(allRules);
			} else {
				reject(err);
			}
		});
	});
}