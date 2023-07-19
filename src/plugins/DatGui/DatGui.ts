import * as dat from 'dat.gui';
import './config.css';

export function DatGui ({ clientSettings = {}, apiSave = Function(), widthGui = 350 }) {
    const datGui = new dat.GUI({
        width: Number(widthGui)
    });

    const addElementPanel = ({ name = '', guiGroup = null, value = 1 as any } = {}) => {
        const STEP = 0.1;

        const settings = {
            [name]: parseFloat(value)
        };
        const guiItem = guiGroup.add(settings, name, 0, 4).step(STEP);

        const inputDiv: HTMLElement = guiItem.domElement.querySelector('div');
        inputDiv.classList.add('configs');
        const upButton = document.createElement('button');
        const downButton = document.createElement('button');
        upButton.innerText = '▲';
        downButton.innerText = '▼';
        upButton.classList.add('config-btn');
        downButton.classList.add('config-btn');
        inputDiv.appendChild(downButton);
        inputDiv.insertBefore(upButton, inputDiv.querySelector('input'));

        upButton.addEventListener('pointerdown', () => {
            guiItem.setValue((guiItem.getValue() as number) + STEP);
        });

        downButton.addEventListener('pointerdown', () => {
            guiItem.setValue((guiItem.getValue() as number) - STEP);
        });
    };

    Object.keys(clientSettings).forEach((group: string) => {
        const guiGroup = datGui.addFolder(group);
        Object.keys(clientSettings[group]).forEach((name: string) => {
            addElementPanel({
                guiGroup,
                name,
                value: clientSettings[group][name]
            });
        });
    });

    const save = async () => {
        const agree: boolean = global.confirm('Сохранить изменения ?');
        if (agree) {
            const newSaveSettings = {};
            Object.keys(datGui.__folders).forEach((group: string) => {
                newSaveSettings[group] = {};
                datGui.__folders[group].__controllers.forEach(item => {
                    newSaveSettings[group][item.property] = item.getValue().toFixed(2);
                });
            });

            try {
                await apiSave(JSON.stringify(newSaveSettings));
            } catch (e) {
                console.error(e);
                alert('Не удалось сохранить настройки ошибка сервера');
            }
        }
    };

    const reset = async () => {
        const agree: boolean = global.confirm('Сбросить настройки ?');
        if (agree) {
            try {
                await apiSave(JSON.stringify({}));
            } catch (e) {
                console.error(e);
                alert('Не удалось сохранить настройки ошибка сервера');
            }
        }
    };

    const itemSave = datGui.add({ Сохранить: save }, 'Сохранить');
    itemSave.__li.style.borderLeftColor = '#22ff23';
    datGui.add({ Сбросить: reset }, 'Сбросить');
}
