import { VerifyClientMiddleware } from './verify-client.middleware';

describe('VerifyClientMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyClientMiddleware()).toBeDefined();
  });
});
