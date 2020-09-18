// Check for collision
export function isCollide (a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) 
        || (aRect.left > bRect.right) || (aRect.right < bRect.left)
    )
}