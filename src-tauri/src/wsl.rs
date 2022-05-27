use std::process::Command;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct WslError {
  pub msg: String,
}

#[derive(Serialize, Deserialize)]
enum WslListItemState {
  Running,
  Stopped,
}

#[derive(Serialize, Deserialize)]
pub struct WslListItem {
  name: String,
  state: WslListItemState,
  version: u64,
}

#[tauri::command]
pub fn wsl_installed() -> bool {
  let mut cmd = Command::new("wsl");
  cmd.arg("--status");
  match cmd.output() {
    Err(_err) => {
      println!("error {}", _err);
      false
    },
    // todo parse output to get version and last update
    Ok(_) => {
      true
    }
  }
}
