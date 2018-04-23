import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dwarf } from '../shared/models/dwarf.model';

@Injectable()
export class DwarfService {

  constructor(private http: HttpClient) { }

  getDwarfs(): Observable<Dwarf[]> {
    return this.http.get<Dwarf[]>('/api/dwarfs');
  }

  countDwarfs(): Observable<number> {
    return this.http.get<number>('/api/dwarfs/count');
  }

  addDwarf(dwarf: Dwarf): Observable<Dwarf> {
    return this.http.post<Dwarf>('/api/dwarf', dwarf);
  }

  getDwarf(dwarf: Dwarf): Observable<Dwarf> {
    return this.http.get<Dwarf>(`/api/dwarf/${dwarf._id}`);
  }

  editDwarf(dwarf: Dwarf): Observable<string> {
    return this.http.put(`/api/dwarf/${dwarf._id}`, dwarf, { responseType: 'text' });
  }

  deleteDwarf(dwarf: Dwarf): Observable<string> {
    return this.http.delete(`/api/dwarf/${dwarf._id}`, { responseType: 'text' });
  }

}
