using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UpdatinguserCourseRepositorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isLearned",
                table: "TranslationUserProgresses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isToReview",
                table: "TranslationUserProgresses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "timesRepeated",
                table: "TranslationUserProgresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isLearned",
                table: "TranslationUserProgresses");

            migrationBuilder.DropColumn(
                name: "isToReview",
                table: "TranslationUserProgresses");

            migrationBuilder.DropColumn(
                name: "timesRepeated",
                table: "TranslationUserProgresses");
        }
    }
}
