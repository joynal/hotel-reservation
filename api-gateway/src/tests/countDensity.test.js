const ignoreWords = require('../seed/ignoreWords');
const countDensity = require('../utils/countDensity');

console.log(countDensity('Kim loves going to the cinema', ignoreWords));


describe('Lexical density count unit test:', () => {
  it('should return null on invalid input #1', async () => {
    const want = null;
    const got = countDensity();
    expect(got).toBe(want);
  });

  it('should return null on invalid input #2', async () => {
    const want = null;
    const got = countDensity(56, 78);
    expect(got).toBe(want);
  });

  it('should return null on invalid input #3', async () => {
    const want = null;
    const got = countDensity(null, '');
    expect(got).toBe(want);
  });

  it('should return NaN on empty input', async () => {
    const want = NaN;
    const got = countDensity('', []);
    expect(got).toBe(want);
  });

  it('should return 0.67', async () => {
    const want = 0.67;
    const got = countDensity('Kim loves going to the cinema', ignoreWords);
    expect(got).toBe(want);
  });

  it('should return 0.8', async () => {
    const want = 0.8;
    const got = countDensity('The quick brown fox jumped swiftly over the lazy dog.', ignoreWords);
    expect(got).toBe(want);
  });

  it('should return 0.78', async () => {
    const want = 0.78;
    const input = "At this moment with a growing economy, shrinking deficits, bustling industry, booming energy production we have risen from recession freer to write our own future than any other nation on Earth . It's now up to us to choose who we want to be over the next 15 years and for decades to come.";
    const got = countDensity(input, ignoreWords);
    expect(got).toBe(want);
  });
});
