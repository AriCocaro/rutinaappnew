import { branding } from "@/config/branding";

/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
|
| Punto único de acceso al branding.
|
| Hoy devuelve un objeto estático.
|
| Mañana puede leer:
|
| - LocalStorage
| - Supabase
| - Configuración de empresa
| - Context API
|
| sin modificar los componentes.
|
*/


export function useBranding() {

  return branding;
}