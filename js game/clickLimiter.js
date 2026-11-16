export const limitClicks = ($button, limit, action) => {
    const label = $button.innerText;
    let count = 0;

    const renderLabel = () => {
        $button.innerText = `${label} (${limit - count})`;
    };

    $button.addEventListener('click', () => {
        if (count >= limit) return;
        count++;
        const left = limit - count;
        console.log(`${label}: натискань ${count}, залишилось ${left}`);
        renderLabel();
        if (left === 0) {
            console.log(`${label}: ліміт натискань вичерпано`);
            $button.disabled = true;
        }
        action();
    });

    renderLabel();

    return () => limit - count;
};
