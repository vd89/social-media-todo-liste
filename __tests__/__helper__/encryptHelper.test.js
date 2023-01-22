import { decrypt, encrypt } from '../../src/helper/encryptionHelper.js';

describe('Test encryptHelper function', () => {
  let encryptSting;
  test('should encrypt', async () => {
    encryptSting = await encrypt('test_text');
    expect(encryptSting).not.toBeNull();
    expect(encryptSting).not.toBeUndefined();
    expect(encryptSting).not.toMatch('test_text');
  });
  test('should decrypt', async () => {
    const decryptSting = await decrypt(encryptSting);
    expect(decryptSting).not.toBeNull();
    expect(decryptSting).not.toBeUndefined();
    expect(decryptSting).toMatch('test_text');
  });
});
