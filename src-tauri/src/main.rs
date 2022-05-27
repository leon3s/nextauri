#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod wsl;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![wsl::wsl_installed])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
