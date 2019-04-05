import * as controller from '../service';

export function createRule(req: any, res: any){
    controller.create(req.body)
    .then((response: any) => {
        res.send(response);
    })
    .catch((err) =>{
        res.send(err);
    });
}
export function deleteRule(req: any, res: any){
    controller.del(req.params.id)
    .then((response: any) => {
        res.send(response);
    })
    .catch((err) =>{
        res.send(err);
    });   
}
export function listRules(req: any, res: any){
    controller.list()
    .then((response: any) => {
        res.send(response);
    })
    .catch((err) =>{
        res.send(err);
    });
}
export function getIntervals(req: any, res: any){
    controller.get(req.query.startAt, req.query.endAt)
    .then((response: any) => {
        res.send(response);
    })
    .catch((err) =>{
        res.send(err);
    });
}