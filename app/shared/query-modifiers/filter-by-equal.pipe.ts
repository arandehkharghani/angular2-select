import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'filterByEqual',
    pure: false,    
})

/**
 * filters an array by the 'selected' key passing true or false 
 */


export class FilterByEqualPipe implements PipeTransform {
    transform(items: any[], field: string, value: any): any {        
        return items.filter(item=>item[field] == value);
    }
}