use std::fs;

const SIZE: usize = 1000;

#[derive(Debug)]
struct Claim {
    id: String,
    x: usize,
    y: usize,
    width: usize,
    height: usize,
}

impl Claim {
    fn occupy_fabric(&self, grid: &mut Vec<Vec<u32>>) {
        for x in 0..self.width {
            for y in 0..self.height {
                grid[self.y + y][self.x + x] += 1;
            }
        }
    }

    fn does_not_overlap(&self, grid: &Vec<Vec<u32>>) -> bool {
        for x in 0..self.width {
            for y in 0..self.height {
                if grid[self.y + y][self.x + x] > 1 {
                    return false
                }
            }
        }
        true
    }
}

fn parse_claim(line: &str) -> Claim {
    let parts: Vec<&str> = line.split_whitespace().collect();
    let coordinates: Vec<usize> = parts[2][0..parts[2].len() - 1].split(",")
        .map(|coord| coord.parse::<usize>().unwrap())
        .collect();

    let dimensions: Vec<usize> = parts[3].split("x")
        .map(|dimension| dimension.parse::<usize>().unwrap())
        .collect();

    Claim {
        id: String::from(parts[0]),
        x: coordinates[0],
        y: coordinates[1],
        width: dimensions[0],
        height: dimensions[1],
    }
}

fn read_input_to_claim_array(filename: &str) -> Vec<Claim> {
    fs::read_to_string(filename)
        .expect("Input file not found")
        .lines()
        .map(|line| parse_claim(line))
        .collect()
}

fn puzzle_one(grid: &Vec<Vec<u32>>) -> u32 {
    grid.into_iter()
        .map(|row| row.into_iter().fold(0, |acc, &val| if val > 1 { acc + 1 } else { acc }))
        .fold(0, |acc, val| acc + val)
}

fn puzzle_two<'a, 'b>(grid: &Vec<Vec<u32>>, claims: &'b Vec<Claim>) -> Option<&'b Claim> {
    claims.iter()
        .find(|claim| claim.does_not_overlap(&grid))
}

fn main() {
    let claims = read_input_to_claim_array("input.txt");
    let mut grid: Vec<Vec<u32>> = vec![vec![0; SIZE]; SIZE];

    for claim in &claims {
        claim.occupy_fabric(&mut grid);
    }

    println!("The answer to puzzle 1 is {}", puzzle_one(&grid));
    match puzzle_two(&grid, &claims) {
        Some(claim) => println!("The answer to puzzle 2 is {}", claim.id),
        None => println!("Couln't find the correct claim for puzzle 2")
    }
}
