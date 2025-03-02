class SaveSystem {
    static saveGame(player) {
        const saveData = {
            x: player.x,
            y: player.y,
            inventory: player.inventory,
            health: player.health,
            level: player.level,
            experience: player.experience
        };
        localStorage.setItem("saveData", JSON.stringify(saveData));
    }

    static loadGame() {
        const data = JSON.parse(localStorage.getItem("saveData"));
        if (data) {
            let player = new Player(data.x, data.y);
            player.inventory = data.inventory;
            player.health = data.health;
            player.level = data.level;
            player.experience = data.experience;
            return player;
        }
        return null;
    }
}
