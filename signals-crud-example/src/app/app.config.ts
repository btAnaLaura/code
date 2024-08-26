import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
 
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserService } from './features/users/user.service';
import { provideHttpClient } from '@angular/common/http';
import { TaskService } from './features/task/task.service';
 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(), 
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    UserService, 
    TaskService]
};
