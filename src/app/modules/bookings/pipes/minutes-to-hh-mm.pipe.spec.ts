import { MinutesToHhMmPipe } from './minutes-to-hh-mm.pipe';

describe('MinutesToHhMmPipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesToHhMmPipe();
    expect(pipe).toBeTruthy();
  });
});
