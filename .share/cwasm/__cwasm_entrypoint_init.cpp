#ifdef PLATFORM_WEB
#define PLATFORM_WEB
#include <emscripten/emscripten.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

int onEntry() {
  return 0;
}

int main() {
  return 0;
}

#ifdef __cplusplus
}
#endif