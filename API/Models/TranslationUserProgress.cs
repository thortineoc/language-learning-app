using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TranslationUserProgress
    {
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Translation Translation { get; set; }
        public int TranslationId { get; set; }
    }
}