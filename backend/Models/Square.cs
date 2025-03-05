namespace SquareApi.Models
{
    public class Square
    {
        public string Color { get; set; } = string.Empty;
        public string? OriginalColor { get; set; }
    }

    public class SquareState
    {
        public List<Square> Squares { get; set; } = new List<Square>();
    }
} 