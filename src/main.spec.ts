import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

const mockApp = {
  get: jest.fn(),
  listen: jest.fn(),
};

const flushPromises = () => new Promise(process.nextTick);

describe('bootstrap (main.ts)', () => {
  const originalExit = process.exit;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    mockApp.get.mockReset();
    mockApp.listen.mockReset();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  afterEach(() => {
    process.exit = originalExit;
    delete process.env.PORT;
  });

  it('logs successful MongoDB connection details and starts the server', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const connection = {
      host: 'localhost',
      db: { databaseName: 'test-db' },
    };
    mockApp.get.mockReturnValue(connection);
    mockApp.listen.mockResolvedValue(undefined);
    process.env.PORT = '4567';

    await import('./main');
    await flushPromises();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(mockApp.get).toHaveBeenCalledWith(getConnectionToken());
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ MongoDB connected successfully!');
    expect(consoleLogSpy).toHaveBeenCalledWith('Database:', 'test-db');
    expect(consoleLogSpy).toHaveBeenCalledWith('Host:', 'localhost');
    expect(mockApp.listen).toHaveBeenCalledWith('4567');
    expect(consoleLogSpy).toHaveBeenCalledWith('🚀 Application is running on: http://localhost:4567');
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('exits the process when the configured port is already in use', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);

    const connection = {
      host: 'localhost',
      db: { databaseName: 'test-db' },
    };
    mockApp.get.mockReturnValue(connection);
    mockApp.listen.mockRejectedValue({ code: 'EADDRINUSE' });
    process.env.PORT = '4567';

    await import('./main');
    await flushPromises();

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Port 4567 is already in use'));

    consoleErrorSpy.mockRestore();
  });
});



