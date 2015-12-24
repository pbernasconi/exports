import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {ExportsApp} from '../app/exports';

beforeEachProviders(() => [ExportsApp]);

describe('App: Exports', () => {
  it('should have the `defaultMeaning` as 42', inject([ExportsApp], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([ExportsApp], (app) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

