export class Spēle {
    constructor(canvas, spēleBeigusiesElements) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.spēleBeigusiesElements = spēleBeigusiesElements;
        
        // Canvas izmēri
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Spēlētāja parametri
        this.spēlētājs = {
            x: 50,
            y: this.canvas.height - 80,
            platums: 30,
            augstums: 30,
            ātrums: 5,
            vertikālaisĀtrums: 0,
            lēkā: false,
            krāsa: '#3498db'
        };
        
        this.gravitācija = 0.8;
        this.lēcienaSpēks = -15;
        
        this.platformas = [
            { x: 0, y: this.canvas.height - 20, platums: this.canvas.width, augstums: 20, krāsa: '#8b4513' },
            { x: 100, y: 400, platums: 150, augstums: 20, krāsa: '#8b4513' },
            { x: 300, y: 300, platums: 150, augstums: 20, krāsa: '#8b4513' },
            { x: 500, y: 400, platums: 150, augstums: 20, krāsa: '#8b4513' },
            { x: 200, y: 200, platums: 150, augstums: 20, krāsa: '#8b4513' }
        ];
        
        this.mērķis = {
            x: this.canvas.width - 80,
            y: 100,
            platums: 30,
            augstums: 30,
            krāsa: '#2ecc71'
        };
        
        this.spēleBeigusies = false;
        this.taustiņi = {};
        
        // Taustiņu notikumu apstrāde
        document.addEventListener('keydown', (e) => this.taustiņi[e.key] = true);
        document.addEventListener('keyup', (e) => this.taustiņi[e.key] = false);
    }
    
    sākt() {
        this.spēleBeigusies = false;
        this.spēleBeigusiesElements.style.display = 'none';
        requestAnimationFrame(() => this.spēlesCikls());
    }
    
    atsākt() {
        this.spēlētājs.x = 50;
        this.spēlētājs.y = this.canvas.height - 80;
        this.spēlētājs.vertikālaisĀtrums = 0;
        this.spēlētājs.lēkā = false;
        this.spēleBeigusies = false;
        this.spēleBeigusiesElements.style.display = 'none';
        this.spēlesCikls();
    }
    
    spēlesCikls() {
        this.atjaunināt();
        this.zīmēt();
        
        if (!this.spēleBeigusies) {
            requestAnimationFrame(() => this.spēlesCikls());
        }
    }
    
    atjaunināt() {
        // Spēlētāja kustība
        if (this.taustiņi['ArrowLeft']) {
            this.spēlētājs.x -= this.spēlētājs.ātrums;
            if (this.spēlētājs.x < 0) this.spēlētājs.x = 0;
        }
        
        if (this.taustiņi['ArrowRight']) {
            this.spēlētājs.x += this.spēlētājs.ātrums;
            if (this.spēlētājs.x + this.spēlētājs.platums > this.canvas.width) {
                this.spēlētājs.x = this.canvas.width - this.spēlētājs.platums;
            }
        }
        
        // Lēciens
        if (this.taustiņi[' '] && !this.spēlētājs.lēkā) {
            this.spēlētājs.vertikālaisĀtrums = this.lēcienaSpēks;
            this.spēlētājs.lēkā = true;
        }
        
        // Gravitācija
        this.spēlētājs.vertikālaisĀtrums += this.gravitācija;
        this.spēlētājs.y += this.spēlētājs.vertikālaisĀtrums;
        
        // Sadursmes ar platformām
        this.platformas.forEach(platforma => {
            if (this.sadursme(this.spēlētājs, platforma)) {
                this.spēlētājs.y = platforma.y - this.spēlētājs.augstums;
                this.spēlētājs.vertikālaisĀtrums = 0;
                this.spēlētājs.lēkā = false;
            }
        });
        
        // Pārbaude, vai spēlētājs izkritis no ekrāna
        if (this.spēlētājs.y > this.canvas.height) {
            this.atsākt();
        }
        
        // Pārbaude, vai sasniegts mērķis
        if (this.sadursme(this.spēlētājs, this.mērķis)) {
            this.spēleBeigusies = true;
            this.spēleBeigusiesElements.style.display = 'block';
        }
    }
    
    zīmēt() {
        // Notīrīt canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Zīmēt platformas
        this.platformas.forEach(platforma => {
            this.ctx.fillStyle = platforma.krāsa;
            this.ctx.fillRect(platforma.x, platforma.y, platforma.platums, platforma.augstums);
        });
        
        // Zīmēt mērķi
        this.ctx.fillStyle = this.mērķis.krāsa;
        this.ctx.fillRect(this.mērķis.x, this.mērķis.y, this.mērķis.platums, this.mērķis.augstums);
        
        // Zīmēt spēlētāju
        this.ctx.fillStyle = this.spēlētājs.krāsa;
        this.ctx.fillRect(this.spēlētājs.x, this.spēlētājs.y, this.spēlētājs.platums, this.spēlētājs.augstums);
    }
    
    sadursme(obj1, obj2) {
        return obj1.x < obj2.x + obj2.platums &&
               obj1.x + obj1.platums > obj2.x &&
               obj1.y < obj2.y + obj2.augstums &&
               obj1.y + obj1.augstums > obj2.y;
    }
}


