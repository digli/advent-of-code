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
    fn occupy_fabric(&self, mut grid: &Box<[[i32; SIZE]; SIZE]>) {
        for x in 0..self.width {
            for y in 0..self.height {
                // How do i reference the boxed value?
                grid[self.y + y][self.x + x] += 1;
            }
        }
    }
}

fn parse_line(line: &str) -> Claim {
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

fn read_input(filename: &str) -> Vec<Claim> {
    fs::read_to_string(filename)
        .expect("Input file not found")
        .lines()
        .map(|line| parse_line(line))
        .collect()
}

fn puzzle_one(input: &Vec<Claim>) -> u32 {
    // How do I allocate a "large" array without overflowing the stack?
    let grid = Box::new([[0; SIZE]; SIZE]);

    for claim in input {
        println!("{}", claim.id);
        claim.occupy_fabric(&grid);
    }

    // TODO: Count every position in the grid occupied more than once
    0
}

fn main() {
    let input = read_input("test_input.txt");
    println!("{:?}", input);
    println!("The answer to puzzle 1 is {}", puzzle_one(&input));
}
