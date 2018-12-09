
fn insert_at_index<T>(v: &mut Vec<T>, value: T, index: usize)
    where T: Clone
{
    v.splice(index..index, [value].iter().cloned());
}

fn modulo(a: i32, b: i32) -> i32 {
    ((a % b) + b) % b
}

fn puzzle_one(num_players: usize, last_marble: usize) -> usize {
    let mut player_score = vec![0usize; num_players];
    let mut circle: Vec<usize> = vec![0usize, 1usize];
    let mut current_marble = 1usize;

    for current in 2..last_marble + 1 {
        if current > 0 && current % 23 == 0 {
            let current_player = current % num_players;
            current_marble = modulo(current_marble as i32 - 7, circle.len() as i32) as usize;
            player_score[current_player] += current + circle.remove(current_marble);
        } else {
            current_marble += 2;
            if current_marble == circle.len() {
                circle.push(current);
            } else {
                current_marble %= circle.len();
                insert_at_index(&mut circle, current, current_marble);
            }
        }
    }

    player_score.into_iter().max_by_key(|val| val.clone()).unwrap()
}


fn main() {
    println!("The answer to puzzle 1 is {}", puzzle_one(476, 71431));

    // this might take a day or two
    println!("The answer to puzzle 2 is {}", puzzle_one(476, 71431 * 100));
}
