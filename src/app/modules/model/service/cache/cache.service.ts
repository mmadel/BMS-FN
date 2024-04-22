import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any[]>();
  public cache$ = new BehaviorSubject<any[]>(null);
  constructor() { }
  set(key: string, data: any[]): void {
    // We check if data already exists for this key.
    if (this.cache.has(key)) {
      // If it already exists, we throw an exception to prevent overwriting the data.
      throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
    }
    // If there is no data for this key, we store it in the cache and update the BehaviorSubject.
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key));
  }
  get(key: string): any[] {
    // We retrieve the data from the cache and update the BehaviorSubject.
    const data = this.cache.get(key);
    this.cache$.next(data);
    return data;
  }
  clear(key: string): void {
    // We remove the data from the cache and update the BehaviorSubject.
    this.cache.delete(key);
    this.cache$.next(null);
  }
}
